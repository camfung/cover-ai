import React from "react"
import { Form, Field } from "react-final-form"
import { Button, TextField, Box, Typography } from "@mui/material"
import { useForm, Controller } from 'react-hook-form';
import axios from "axios"
const EnterQuestions = ({ deck }) => {
    console.log("🚀 ~ file: EnterQuestions.jsx:7 ~ EnterQuestions ~ deck:", deck)
    const createCard = async (data) => {
        try {
            const response = await axios.post(
                import.meta.env.VITE_SERVER_URL + "/card",
                { deck_id: deck, question: data.question },
                { noAuth: true }
            );

        } catch (error) {
            // Handle error here
            console.error("Error fetching playlists:", error);
        }
    };
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        data.deck_id = deck;
        await createCard(data);
        reset();
    };

    return (
        <>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                maxWidth: 500,
                margin: 'auto'
            }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Enter Your Question
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Controller
                        name="question"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Type here"
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
        </>
    );

}
export default EnterQuestions;