import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

const LandingPage = () => {
    const handleSpotifyAuth = () => {
        // Redirect to Spotify authentication page
        window.location.href = import.meta.env.VITE_SERVER_URL + "/spotify-login";
    };

    return (
        <Container maxWidth="md" sx={{ bgcolor: '#f4f6f8', py: 5 }}>
            <Box textAlign="center" my={5}>
                <Typography variant="h2" gutterBottom sx={{ color: '#123456', fontWeight: 'bold' }}>
                    Welcome to Our Spotify-DALL-E Integration
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph sx={{ color: '#7890ab', mb: 3 }}>
                    Discover a new way to experience music and art. Connect your Spotify to generate unique artworks with DALL-E based on your favorite songs.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSpotifyAuth}
                    sx={{
                        bgcolor: '#345678',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#456789'
                        }
                    }}>
                    Connect with Spotify
                </Button>
            </Box>
        </Container>
    );
};

export default LandingPage;
