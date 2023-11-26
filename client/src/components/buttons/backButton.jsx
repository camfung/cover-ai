import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton({ onClick }) {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            onClick={onClick}
        >
            Back
        </Button>
    );
}

export default BackButton;
