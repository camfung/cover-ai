import React, { useState, useCallback, useEffect } from "react";
import { Button, Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import SelectDeck from "./SelectDeck";
import EnterQuestions from "./EnterQuestions";
import Cards from "./Cards";
import Spinner from "./Spinner";

const StirThePot = () => {
    const [decks, setDecks] = useState([]);
    const [hide, setHide] = useState(false);
    const [deck, setDeck] = useState({});
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
        const getDecks = async () => {
            const result = await axios.get(import.meta.env.VITE_SERVER_URL + "/deck", { noAuth: true });
            setDecks(result.data.rows);
        };
        getDecks();
    }, []);
    const getCards = useCallback(async (deckId) => {
        try {
            const response = await axios.get(import.meta.env.VITE_SERVER_URL + "/card?deck_id=" + deckId, { noAuth: true });
            setQuestions(shuffle(response.data.rows.map((question) => question.question)));
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    }, [deck]);
    const handleChange = useCallback((event) => {
        console.log("🚀 ~ file: stirthepot.jsx:31 ~ handleChange ~ event:", event)
        setDeck(event.target.value);
        getCards(event.target.value);
    }, [deck]);
    function shuffle(array) {
        console.log("🚀 ~ file: stirthepot.jsx:27 ~ shuffle ~ array:", array)
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        console.log("🚀 ~ file: stirthepot.jsx:44 ~ shuffle ~ array:", array)
        return array;
    }



    const prevQuestion = useCallback(() => {
        console.log(currentQuestion)
        if (currentQuestion >= 0) setCurrentQuestion(currentQuestion - 1)
    }, [currentQuestion, setCurrentQuestion]);

    const nextQuestion = useCallback(() => {
        console.log("🚀 ~ file: stirthepot.jsx:64 ~ nextQuestion ~ currentQuestion:", currentQuestion)
        console.log("🚀 ~ file: stirthepot.jsx:65 ~ nextQuestion ~ questions.length :", questions.length)
        if (currentQuestion <= questions.length - 1) setCurrentQuestion(currentQuestion + 1)
    }, [currentQuestion, setCurrentQuestion, questions]);


    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', textAlign: 'center', }}>
            {!hide &&
                <Box>
                    <Typography variant="h4" gutterBottom>Select a deck and submit questions</Typography>
                    <SelectDeck deck={deck} handleChange={handleChange} decks={decks} />
                    <EnterQuestions deck={deck} />
                </Box>
            }

            <FormControlLabel
                control={<Checkbox checked={hide} onChange={() => setHide(!hide)} />}
                label="Hide"
                sx={{ mb: 2 }}
            />

            <Cards questions={questions} currentQuestion={currentQuestion} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="outlined" onClick={prevQuestion}>Prev</Button>
                <Button variant="contained" onClick={nextQuestion}>Next</Button>
            </Box>
            <Spinner></Spinner>
        </Box>
    );
}

export default StirThePot;
