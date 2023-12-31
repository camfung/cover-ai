import React from "react";
import { Select, FormControl, MenuItem, InputLabel, Paper, Box, Typography } from "@mui/material";

const SelectDeck = ({ decks, deck, handleChange }) => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Select a Deck
                </Typography>
                <FormControl fullWidth variant="outlined" sx={{ minWidth: 200 }}>
                    <InputLabel id="deck-select-label">Deck</InputLabel>
                    <Select
                        labelId="deck-select-label"
                        value={deck}
                        label="Deck"
                        onChange={handleChange}
                    >
                        {decks?.map((deck) => (
                            <MenuItem key={deck.id} value={deck.id}>
                                {`${deck.title} (${deck.card_count} cards)`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Paper>
    );
}

export default SelectDeck;
