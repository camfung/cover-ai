import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Button, Typography, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BackButton from './buttons/backButton';
import CreditBar from './dataDisplay/CreditBar';
const SongsDataGrid = () => {
    const path = window.location.pathname;
    const pathSegments = path.split('/');
    const playlistId = pathSegments[2];
    const [songsData, setSongsData] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef();

    const redirectToConfirmPage = useCallback(() => {
        const songs = selectedRowIds.map(id => songsData[id])
        if (songs.length === 0) {
            setOpen(true)
            return
        }
        location.state = { selectedSongs: songs, playlistId: playlistId }
        console.log("🚀 ~ file: SongsDataGrid.jsx:19 ~ redirectToConfirmPage ~ songs:", songs)
        navigate("/makePlaylistCover", { state: { selectedSongs: songs } })
    }, [selectedRowIds, setSelectedSongs])

    const goBack = useCallback(() => {
        navigate("/playlists")
    }, [])
    useEffect(() => {
        const fetchPlaylistsTracks = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    import.meta.env.VITE_SERVER_URL + `/get-playlist-tracks?playlistId=${playlistId}`,
                    { withCredentials: true }
                );
                setSongsData(response.data);
            } catch (error) {
                // Handle error here
                console.error("Error fetching playlists:", error);
            }
            setLoading(false)
        };

        fetchPlaylistsTracks();
    }, [])

    const rows = useMemo(() => {
        if (!songsData) {
            console.log("dsf")
            return [];
        }

        const r = songsData?.map((item, index) => ({
            id: index,
            addedAt: item.added_at,
            albumName: item.track.album.name,
            artistNames: item.track.artists.map(artist => artist.name).join(', '),
            trackName: item.track.name,
            releaseDate: item.track.album.release_date
        }));
        return r
    }, [songsData]);

    // Define the columns for the Data Grid
    const columns = [
        { field: 'trackName', headerName: 'Track Name', width: 200 },
        { field: 'artistNames', headerName: 'Artists', width: 200 },
        { field: 'releaseDate', headerName: 'Release Date', width: 150 },
        { field: 'albumName', headerName: 'Album Name', width: 200 },
        { field: 'addedAt', headerName: 'Added At', width: 150 },
    ];
    const handleSelectionChange = useCallback((rowSelectionModel) => {
        setSelectedRowIds(rowSelectionModel)
    }, [setSelectedRowIds]);


    return (
        <Box sx={{ height: 700, width: '100%', mt: 2, }}>
            <CreditBar playlistTitle={decodeURIComponent(location.state.playlistTitle)} goBack={goBack}></CreditBar>
            <Typography variant="h4" gutterBottom>
                Please select the songs you want to use for your playlist cover.
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                sx={{ backgroundColor: "white" }}
            />
            <Box sx={{ mt: 4, textAlign: 'center' }}>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={redirectToConfirmPage}
                    sx={{ mt: 1 }}
                >
                    Done
                </Button>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                message="Please Select at least one song."
                onClose={() => setOpen(false)}
            />
        </Box>
    );
};

export default SongsDataGrid;
