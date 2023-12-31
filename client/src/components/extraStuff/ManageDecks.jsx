import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Box, Typography } from "@mui/material";
import axios from "axios";

const ManageDecks = () => {
    const createCard = async (data) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_SERVER_URL + "/deck",
                { deckName: data.deckName },
                { noAuth: true }
            );

        } catch (error) {
            console.error("Error fetching playlists:", error);
        }
    };
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        await createCard(data);
        reset();
    };

    return (
        <div>
            <h1>Manage Decks</h1>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                maxWidth: 500,
                margin: 'auto'
            }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Controller
                        name="deckName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Deck Name"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </div>
    )
}
export default ManageDecks;