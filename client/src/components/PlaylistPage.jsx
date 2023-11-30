import React, { useCallback, useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, Snackbar, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from './buttons/backButton';

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
    const handleConfirm = useCallback(async () => {
        try {
            const selectedSongIds = selectedSongs.map(song => song.track.id).join(",");
            setLoading(true);

            const result = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/generate-playlist-cover",
                { params: { selectedSongIds: selectedSongIds, debug: debug }, withCredentials: true }
            );
            setPlaylistCoverUrl(result.data.images.data[0].url);
            setPlaylistCover(<img src={result.data.images.data[0].url} alt="playlist cover" style={{ width: '100%' }} />);
        } catch (error) {
            // Handle the error here. For example, you might want to log the error or display a message to the user.
            console.error('Error generating playlist cover:', error);
            // Optionally, update the UI to reflect that an error occurred
        } finally {
            // This block will run regardless of whether the try block succeeds or the catch block is executed.
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
        navigate("/playlist/" + playlistId)
    }, [])
    return (
        <Box sx={{ p: 3 }}>

            {import.meta.env.VITE_NODE_ENV == "local" ? <Switch checked={debug} onChange={(event) => handleSwitch(event)}>Free Image</Switch> : <></>}
            <BackButton onClick={goBack}></BackButton>

            <Typography variant="h6" sx={{ mb: 2 }}>
                Selected Songs
            </Typography>
            <Paper sx={{ mb: 3, maxHeight: 300, overflow: 'auto' }}>
                <List>
                    {selectedSongs.map((song, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={song.track.name} secondary={song.track.artists.map((item) => item.name)} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Button
                variant="contained"
                color="primary"
                onClick={handleConfirm}
                sx={{ mb: 3 }}
            >
                Confirm and Generate Cover
            </Button>
            <Box sx={{ minHeight: 300, border: '1px dashed grey', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column", backgroundColor: "white" }}>
                {playlistCover ? (
                    <>
                        {playlistCover}
                        <Button onClick={sendImageToSpotify}>Upload to Spotify</Button>
                    </>
                ) : <Typography>Playlist cover will appear here.</Typography>}
                {loading && (
                    <>
                        <Typography>Generating Image</Typography>
                        <img src="https://i.imgur.com/pKV7YwY.gif" alt="" />
                    </>
                )}
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
        </Box>
    );
};

export default PlaylistPage;
