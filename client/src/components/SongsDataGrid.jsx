import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const SongsDataGrid = () => {
    const path = window.location.pathname; // This will be '/test' in your case
    const pathSegments = path.split('/'); // Split the path by '/'
    const value = pathSegments[2]; // Get the second segment which is 'test'
    const [songsData, setSongsData] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        const fetchPlaylistsTracks = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    import.meta.env.VITE_SERVER_URL + `/get-playlist-tracks?playlistId=${value}`,
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
        console.log("🚀 ~ file: SongsDataGrid.jsx:40 ~ r ~ r:", r)
    }, [songsData]);

    // Define the columns for the Data Grid
    const columns = [
        { field: 'trackName', headerName: 'Track Name', width: 200 },
        { field: 'artistNames', headerName: 'Artists', width: 200 },
        { field: 'releaseDate', headerName: 'Release Date', width: 150 },
        { field: 'albumName', headerName: 'Album Name', width: 200 },
        { field: 'addedAt', headerName: 'Added At', width: 150 },
    ];
    const onRowsSelectionHandler = (ids) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log("🚀 ~ file: SongsDataGrid.jsx:61 ~ onRowsSelectionHandler ~ selectedRowsData:", selectedRowsData)
    };
    return (
        <div style={{ height: "100", width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    console.log("Selected IDs:", ids);
                    const selectedRowsData = rows.filter((row) => ids.includes(row.id));
                    console.log("Selected Rows Data:", selectedRowsData);
                    setSelectedRows(selectedRowsData);
                }}
            />
        </div>
    );
};

export default SongsDataGrid;
