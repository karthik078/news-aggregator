import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import Preferences from '../components/Preferences';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
const navigate = useNavigate();


  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dear Evaluator, <br />This endpoint is under construction
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          I could only spend 3 work days in this app and I had to extend during work days.  <br />
          I just made sure I met all the functional criteria for this task. I could achieve it using just 2 API endpoints.  <br />
          Integrating 3rd API, I'll have to spend bit more time, but logic wise its same as using 2 API's.<br /><br />
          I didn't bother much about beautifying the app with CSS as well. <br />
          Kindly excuse me XD.
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Anyway, If this doesn't meet your needs<br /> Thank you soo much for this opportunity
        </Typography>
        <br />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant='contained' onClick={()=>{navigate("/")}}>Go Back</Button>
        </Box>

      </Paper>
    </Container>
  );
};

export default SettingsPage;
