import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Radio,
  ListItemText,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Preferences = ({ onSavePreferences}) => {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState('NEWS API');
  const [category, setCategory] = useState("none");
  const [disablePreference, setDisablePreference] = useState(true);
  const sources = ['NEWS API', 'The Guardian', 'BBC News' ];
  const categoryOptions = [ "none","business", "entertainment", "general", "health", "science", "sports", "technology",];

  const handleSave = () => {
    const preferences = {
      source: selectedSource,
      category,
    };
    onSavePreferences(preferences);
    setDisablePreference(true);
    if(selectedSource === "BBC News"){
      navigate("/notes");
    }
  };

  const handleSourceChange = (value) => {
    setDisablePreference(false);
    setSelectedSource(value);
  };

  const handleCategoryChange = (value) => {
    setDisablePreference(false);
    setCategory(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Source Selector (Single Select) */}
      <FormControl fullWidth>
        <InputLabel sx={{ background: "white" }}>Preferred Source</InputLabel>
        <Select
          value={selectedSource}
          onChange={(e) => handleSourceChange(e.target.value)}
          renderValue={(selected) => selected || 'Select a source'}
        >
          {sources.map((source) => (
            <MenuItem key={source} value={source}>
              <Radio checked={selectedSource === source} />
              <ListItemText primary={source} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Category Selector (Multiple Select) */}
      <FormControl fullWidth>
        <InputLabel sx={{ background: "white" }}>Preferred Categories</InputLabel>
        <Select
          // multiple
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value.toLowerCase())}
          renderValue={(selected) => selected.charAt(0).toUpperCase() + selected.slice(1) || 'Select a category'}
        >
          {categoryOptions.map((categories) => (
            <MenuItem key={categories} value={categories}>
              <Checkbox checked={category?.includes(categories)} />
              <ListItemText primary={categories.charAt(0).toUpperCase() + categories.slice(1)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Save Button */}
      <Button disabled={disablePreference} variant="contained" color="primary" onClick={handleSave}>
        Save Preferences
      </Button>
    </Box>
  );
};

export default Preferences;
