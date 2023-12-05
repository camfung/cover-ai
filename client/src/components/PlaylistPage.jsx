import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Snackbar, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './buttons/backButton';
import CreditBar from './dataDisplay/CreditBar';
import { useCredits } from '../utils/useCredits';

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
    console.log(location.state)


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
        <Box sx={{ p: 3, height: "80vh", maxWidth: "1024px", display: 'flex', flexDirection: "column", margin: "0 auto" }}>
            <CreditBar credits={credits} goBack={goBack} playlistTitle={decodeURIComponent(location.state.playlistTitle)} />

            {import.meta.env.VITE_NODE_ENV == "local" ? <Switch checked={debug} onChange={(event) => handleSwitch(event)}>Free Image</Switch> : <></>}
            <Box sx={{ height: "80%", display: "grid", gridTemplateColumns: "2fr 3fr", alignItems: 'center', justifyContent: "center", gridGap: "10% 10%", }}>

                <Box sx={{ backgroundColor: "white", height: "90%", overflow: "hidden" }}>
                    <Typography variant="h6" sx={{ mb: 2, backgroundColor: "#FF7700", color: "white" }}>
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
                <Box sx={{
                    // Set the width equal to the height to make the box a square
                    border: "3px dashed black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "90%",
                    aspectRatio: "1 / 1",
                }}>
                    {playlistCover ? (
                        <>
                            {playlistCover}

                        </>
                    ) : <Typography>Playlist cover will appear here.</Typography>}
                    {loading && (
                        <>
                            <Typography>Generating Image</Typography>
                            <img src="https://i.imgur.com/pKV7YwY.gif" alt="" />
                        </>
                    )}
                </Box>
            </Box>
            <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "2fr 3fr", gridGap: "10% 10%", }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    sx={{ maxWidth: "300px", margin: "0 auto" }}
                >
                    Confirm and Generate Cover
                </Button>
                <Button
                    variant="contained"
                    sx={{ maxWidth: "300px", margin: "0 auto" }}
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
