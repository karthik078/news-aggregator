import React, { memo, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import SearchBar from '../components/SearchBar';
import ArticleList from '../components/ArticleList';
import Preferences from '../components/Preferences';
import Grid from '@mui/material/Grid';
import { test } from '../services/apiServices';
import moment from 'moment';
import { Description } from '@mui/icons-material';

const HomePage = () => {
  const [articleData, setArticleData] = useState([]);
  const [preferences, setPreferences] = useState({ source: "NEWS API", category: "none" });

  useEffect(() => {
    fetchSearchDetails();
  }, []);

  useEffect(() => {
    // fetchSearchDetails();
  }, []);

  const fetchSearchDetails = async (params) => {
    let query = `&q=${params?.query}`;
    let category = `?category=${preferences?.category}`;
    let topic = "top-headlines";

    if (preferences?.category === "none") {
      query = `?q=${params?.query || "india"}`;
      topic = "everything";
      category = "";
    }
    let endPoint = `http://newsapi.org/v2/${topic}${category}${query}&apiKey=725b20286c2f4fb086e0a1ea6d0fe385`;


    let endPoint2 = `http://content.guardianapis.com/search?q=sausages&page-size-10&api-key=f37bf28f-784a-4338-8564-11a861e0827a`;



    let data = await test(endPoint);
    console.log('data', data);
    if (preferences.source !== "NEWS API") {
      let articlesArray2 = data?.response?.results?.map((x) => ({
        id: x.id,
        url: x.webUrl,
        title: x.sectionName,
        description: x.webTitle,
        date: x.webPublicationDate

      }))
    }
    // return;

    let articlesArray = data?.articles;

    if (params?.date) {
      articlesArray = data?.articles.filter((date) => (moment(date?.publishedAt).format("YYYY-MM-DD") === params?.date));
      console.log("articlesArray", articlesArray)
      setArticleData(articlesArray.reverse());
    } else {
      console.log("articlesArray 2", articlesArray)
      setArticleData(articlesArray);
    }
  };

  const handleSearchArticles = (filters) => {
    console.log(filters);
    fetchSearchDetails({ query: filters?.keyword, date: filters?.date, category: preferences?.category || "none" });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3} sx={{ marginTop: 0, width: "100%", marginLeft: 0, paddingLeft: 0, }}>
        {/* SearchBar Section */}
        <Grid
          item
          xs={12}
          sx={{
            position: { xs: 'relative', sm: 'sticky' },
            top: { xs: 0, sm: 20 },
            padding: 2,
            paddingLeft: 0,
            boxShadow: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            zIndex: 10, // Ensures it stays on top during scrolling
          }}
        >
          <SearchBar onSearch={handleSearchArticles} source={preferences?.source} />
        </Grid>

        {/* Preferences Section */}
        <Grid item xs={12} md={3} sx={{ paddingLeft: "0px !important", }}>
          <Box
            sx={{
              position: { xs: 'relative', sm: 'sticky' },
              top: { xs: 0, sm: 20, md: 130 },
              padding: 2,

              boxShadow: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              zIndex: 5,
              marginTop: { xs: 2, sm: 0 }, // Adds spacing on mobile
            }}
          >
            <Preferences onSavePreferences={(prefs) => { console.log(prefs); setPreferences(prefs) }} />
          </Box>
        </Grid>

        {/* ArticleList Section */}
        <Grid item xs={12} md={9} sx={{ paddingLeft: "0px !important", }}>
          <Box sx={{ position: 'relative' }}>
            <ArticleList articles={articleData || []} />
          </Box>

        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(HomePage);
