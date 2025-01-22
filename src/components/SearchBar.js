import React, { memo, useEffect, useState } from 'react';
import { TextField, Select, MenuItem, Button, Container, Grid } from '@mui/material';

const SearchBar = ({ onSearch, source }) => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const handleSearch = () => {
        onSearch({ keyword, category, date });
    };

    useEffect(()=>{
        if(source === "NEWS API"){
            setCategory("");
        }
    }, [source])

    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, // Column for mobile, row for laptops
                gap: 2,
                alignItems: 'center', // Center align items horizontally
                justifyContent : "space-between",
                flexWrap: 'wrap',
                // paddingLeft : "0 !important",
                // paddingTop: 2,
            }}
        >
            {/* Category Select */}
            <Select
                value={category}
                disabled = {source === "NEWS API"}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                fullWidth
                sx={{ flex: { md: 1 }, minWidth: '180px' }} // Flex for laptops, fixed width for mobile
            >
                <MenuItem value="">All Authors</MenuItem>
                <MenuItem value="sports">Sports</MenuItem>
                <MenuItem value="technology">Technology</MenuItem>
            </Select>

            {/* Date Picker */}
            <TextField
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                sx={{ flex: { md: 1 }, minWidth: '180px' }}
            />

            {/* Keyword Input */}
            <TextField
                label="Keyword"
                variant="outlined"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                fullWidth
                sx={{ flex: { md: 2 }, minWidth: '200px' }}
            />

            {/* Search Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{
                    flex: { md: 0.5 }, // Smaller flex size for the button
                    minWidth: '120px', // Minimum width for consistency
                }}
            >
                Search
            </Button>
        </Container>
    );
};

export default memo(SearchBar);
