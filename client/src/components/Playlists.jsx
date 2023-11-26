import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./playlist.css"
const Playlists = ({ title }) => {
    const navigate = useNavigate();
    // Define your color scheme here
    const primaryColor = '#123456'; // Example primary color
    const secondaryColor = '#7890ab'; // Example secondary color
    const [playlists, setPlaylists] = useState(null);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_SERVER_URL + "/get-playlists",
                    { withCredentials: true }
                );
                setPlaylists(response.data);
            } catch (error) {
                // Handle error here
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, []); // Empty dependency array means this runs once when the component mounts
    const handleCardClick = (itemId) => {
        navigate(`/playlist/${itemId}`);
    };
    return (
        <>

            <Typography variant="h4">
                Your Playlists
            </Typography>

            <Grid container spacing={2}>
                {playlists?.playlists.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card className='card' sx={{ backgroundColor: secondaryColor }} onClick={() => handleCardClick(item.id)}>
                            <div style={{
                                width: '100%', // Width of the container
                                height: 0, // Initial height
                                paddingBottom: '100%', // Creates a square aspect ratio
                                position: 'relative', // Enables absolute positioning for the child
                            }}>
                                <img
                                    src={item.images[0]?.url}
                                    alt={item.name}
                                    style={{
                                        position: 'absolute', // Absolute positioning
                                        top: '50%', // Align center vertically
                                        left: '50%', // Align center horizontally
                                        width: 'auto', // Auto width
                                        height: '100%', // Full height of parent
                                        transform: 'translate(-50%, -50%)', // Center the image
                                        objectFit: 'cover', // Cover the area without stretching
                                    }}
                                />
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ color: primaryColor }}>
                                    {item.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>

    );
};

export default Playlists;
