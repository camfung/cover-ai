import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import BackButton from '../buttons/backButton';
function CreditBar({ playlistTitle, goBack, credits }) {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="primary" sx={{ marginBottom: "20px" }}>
            <Toolbar sx={{ minHeight: '60px', display: 'flex', justifyContent: 'space-between' }}>
                <BackButton onClick={() => goBack()}></BackButton>
                <Typography sx={{ margin: "10px" }} variant='h5'>
                    {playlistTitle}
                </Typography>
                <Typography variant="h6" color="inherit">
                    Credits: {credits}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default CreditBar;
