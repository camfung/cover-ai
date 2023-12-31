import React from "react";
import { Card, Box } from "@mui/material";

const Cards = ({ questions, currentQuestion }) => {

    const cardStyle = {
        width: '300px',
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={cardStyle}>
                <div>{questions[currentQuestion]}</div>
            </Card>
        </Box>
    )
}

export default Cards;
