import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Snackbar, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './buttons/backButton';
import CreditBar from './dataDisplay/CreditBar';
import { useCredits } from '../utils/useCredits';
import useScreenSize from '../hooks/useScreenSize';

const PlaylistPage = () => {
    const [playlistCover, setPlaylistCover] = useState(null);
    const [playlistCoverUrl, setPlaylistCoverUrl] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState(location.state.selectedSongs);
    const [playlistId, setPlaylistId] = useState(location.state.playlistId);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const [debug, setDebug] = useState(import.meta.env.VITE_NODE_ENV == "local"); // [DEBUG
    const navigate = useNavigate();
    const [errorOpen, setErrorOpen] = useState(false);
    const { credits, fetchCredits } = useCredits();
    const [outOfCreditsOpen, setOutOfCreditsOpen] = useState(false);
    const screenSize = useScreenSize();
    const boxStyle = {
        p: 3,
        height: screenSize != "small" ? "80vh" : "calc(100vh - 70px) ",
        maxWidth: "1024px",
        display: 'flex',
        flexDirection: "column",
        margin: "0 auto",
    };

    const innerBoxStyle = {
        height: "80%",
        display: screenSize != "small" ? "grid" : "flex",
        gridTemplateColumns: "2fr 3fr",
        alignItems: 'center',
        flexDirection: "column",
        gridGap: "10% 10%"
    };

    const songBoxStyle = {
        height: screenSize != "small" ? "90%" : "30%",
        overflow: "hidden",
        flexGrow: 2,
    };

    const selectedSongsTypographyStyle = {
        mb: 2,
        backgroundColor: "#FF7700",
        color: "white"
    };

    const coverBoxStyle = {
        border: "3px dashed black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: screenSize != "small" ? "90%" : "auto",
        aspectRatio: "1 / 1",
        flexGrow: 3,
    };

    const buttonContainerStyle = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: screenSize != "small" ? "2fr 3fr" : "1fr 1fr",
        gridGap: "10% 10%",
        marginTop: screenSize != "small" ? "auto" : "20px"
    };

    const buttonStyle = {
        maxWidth: "300px",
        margin: "0 auto"
    };
    const handleConfirm = useCallback(async () => {
        try {
            const selectedSongIds = selectedSongs.map(song => song.track.id).join(",");
            setLoading(true);

            const result = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/generate-playlist-cover",
                { params: { selectedSongIds: selectedSongIds, debug: debug }, withCredentials: true }
            );
            fetchCredits();
            setPlaylistCoverUrl(result.data.images.data[0].url);
            setPlaylistCover(<img src={result.data.images.data[0].url} alt="playlist cover" style={{ width: '100%' }} />);
        } catch (error) {
            if (error.response.status == 402) {
                setOutOfCreditsOpen(true)
            }
            console.log(error)
        } finally {
            setLoading(false);
        }
    }, [selectedSongs, setPlaylistCover, setLoading, debug]);

    const sendImageToSpotify = useCallback(async () => {
        try {
            await axios.get(import.meta.env.VITE_SERVER_URL + "/upload-playlist-image", { withCredentials: true, params: { imageUrl: playlistCoverUrl, playlistId: playlistId } })
            setOpen(true)
        } catch (error) {
            console.log(error)
            setErrorOpen(true)
        }
    })

    const handleSwitch = useCallback((event) => {
        setDebug(event.target.checked)
    })
    const goBack = useCallback(() => {
        navigate("/playlist/" + playlistId + "/" + location.state.playlistTitle)
    }, [])
    return (
        <Box sx={boxStyle}>
            <CreditBar credits={credits} goBack={goBack} playlistTitle={decodeURIComponent(location.state.playlistTitle)} />

            {/* {import.meta.env.VITE_NODE_ENV === "local" && (
                <Switch checked={debug} onChange={(event) => handleSwitch(event)}>Free Image</Switch>
            )} */}
            <Box sx={innerBoxStyle}>
                <Box sx={songBoxStyle}>
                    <Typography variant="h6" sx={selectedSongsTypographyStyle}>
                        Selected Songs
                    </Typography>
                    <Paper sx={{ overflow: "auto", height: "100%" }}>
                        <List>
                            {selectedSongs.map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={song.track.name} secondary={song.track.artists.map((item) => item.name)} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Box>
                <Box sx={coverBoxStyle}>
                    {playlistCover ? (
                        <>{playlistCover}</>
                    ) : (
                        <Typography>Playlist cover will appear here.</Typography>
                    )}
                    {loading && (
                        <>
                            <Typography>Generating Image</Typography>
                            <img src="https://i.imgur.com/pKV7YwY.gif" alt="" />
                        </>
                    )}
                </Box>
            </Box>
            <Box sx={buttonContainerStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    sx={buttonStyle}
                >
                    Generate Cover
                </Button>
                <Button
                    variant="contained"
                    sx={buttonStyle}
                    color="primary"
                    onClick={sendImageToSpotify}
                >
                    Upload to Spotify
                </Button>
            </Box>

            <Snackbar
                open={open}
                autoHideDuration={10000}
                message="Playlist Cover uploaded Successfully!"
                onClose={() => setOpen(false)}
            />
            <Snackbar
                open={errorOpen}
                autoHideDuration={10000}
                message="Unable to upload image :("
                onClose={() => setErrorOpen(false)}
            />
            <Snackbar
                open={outOfCreditsOpen}
                autoHideDuration={10000}
                message="Out of Credits :("
                onClose={() => setErrorOpen(outOfCreditsOpen)}
            />
        </Box >
    );
};

export default PlaylistPage;
