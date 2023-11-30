import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton({ onClick }) {
    return (
        <Button
            startIcon={<ArrowBackIcon />}
            onClick={onClick}
            sx={{ color: "white" }}
        >
            Back
        </Button>
    );
}

export default BackButton;
