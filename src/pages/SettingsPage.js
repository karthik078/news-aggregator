import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Preferences from '../components/Preferences';

const SettingsPage = () => {
  const [preferences, setPreferences] = useState({
    sources: [],
    categories: [],
  });

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    // Save preferences to local storage or backend API
    console.log('Preferences saved:', newPreferences);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Customize your news feed by selecting your preferred sources and categories.
        </Typography>
        <Box sx={{ marginTop: 3 }}>
          <Preferences onSavePreferences={handleSavePreferences} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
          Your preferences will be saved locally and used to filter articles in your news feed.
        </Typography>
      </Paper>
    </Container>
  );
};

export default SettingsPage;
