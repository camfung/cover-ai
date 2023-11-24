import React, { useCallback, useState } from 'react';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
const cover = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-QeC7ZTxfNMcvjFmNESArRyDj/user-3opTxCsowq2CdcrpHmBcGVmZ/img-ebyWTNdVFaJ1wiHTtw4yemob.png?st=2023-11-24T06%3A43%3A24Z&se=2023-11-24T08%3A43%3A24Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-11-23T12%3A03%3A07Z&ske=2023-11-24T12%3A03%3A07Z&sks=b&skv=2021-08-06&sig=4YNpEcfUPBoGAHPQt5TSE7aa0sKdpGGqfQABUT8N0KY%3D"
const PlaylistPage = () => {
    const [playlistCover, setPlaylistCover] = useState(null);
    const [selectedSongs, setSelectedSongs] = useState(location.state.selectedSongs);
    const [loading, setLoading] = useState(false);
    const handleConfirm = useCallback(async () => {
        try {
            const selectedSongIds = selectedSongs.map(song => song.track.id).join(",");
            setLoading(true);

            const result = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/generate-playlist-cover",
                { params: { selectedSongIds }, withCredentials: true }
            );

            setPlaylistCover(<img src={result.data.images.data[0].url} alt="playlist cover" style={{ width: '100%' }} />);
        } catch (error) {
            // Handle the error here. For example, you might want to log the error or display a message to the user.
            console.error('Error generating playlist cover:', error);
            // Optionally, update the UI to reflect that an error occurred
        } finally {
            // This block will run regardless of whether the try block succeeds or the catch block is executed.
            setLoading(false);
        }
    }, [selectedSongs, setPlaylistCover, setLoading]);



    return (
        <Box sx={{ p: 3 }}>
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
            <Box sx={{ minHeight: 300, border: '1px dashed grey', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                {playlistCover ? playlistCover : <Typography>Playlist cover will appear here.</Typography>}
                {loading && (
                    <>
                        <Typography>Generating Image</Typography>
                        <img src="https://i.imgur.com/pKV7YwY.gif" alt="" />
                    </>
                )}
            </Box>
        </Box>
    );
};

export default PlaylistPage;
