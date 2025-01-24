

import React, { memo, useEffect, useState } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';
import SearchBar from '../components/SearchBar';
import ArticleList from '../components/ArticleList';
import Preferences from '../components/Preferences';
import Grid from '@mui/material/Grid';
import { test } from '../services/apiServices';
import moment from 'moment';

const HomePage = () => {
  const [articleData, setArticleData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [preferences, setPreferences] = useState({ source: "NEWS API", category: "none", query: "india" });
  const [authorsList, setAuthorsList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchSearchDetails({}, true);
  }, []);


  const fetchSearchDetails = async (params, firstRender) => {
    setLoader(true);
    let source = params?.source || preferences.source;
    let query = `&q=${params?.query}`;
    let category = `?category=${params?.category || preferences?.category}`;
    let topic = "top-headlines";
    // console.log("params",params);

    if (firstRender || (params?.category === "none" || preferences?.category === "none")) {
      query = `?q=${params?.query || "india"}`;
      topic = "everything";
      category = "";
    }

    let newsApiEndpoint = `http://newsapi.org/v2/${topic}${category}${query}&apiKey=1ec1fa61ea0e4b198d80ef4c8a2ac60d`;
    let bbcEndpoint = `http://content.guardianapis.com/search?q=${params?.category || preferences?.category} AND ${params?.query}&page-size-10&api-key=f37bf28f-784a-4338-8564-11a861e0827a`;

    let endpointUrl = source === "The Guardian" ? bbcEndpoint : newsApiEndpoint;


    try {

      let data = await test(endpointUrl);
      // console.log('data', data);
      let articlesArray = data?.articles;
      if (source === "The Guardian") {
        // console.log("articlesArray", data?.response?.results)
        articlesArray = data?.response?.results?.map((x) => ({
          id: x.id,
          url: x.webUrl,
          title: x.sectionName,
          description: x.webTitle,
          publishedAt: x.webPublicationDate

        }))
      }
      setMasterData(articlesArray);
      let authorsList = articlesArray?.map(x => (x.author));
      if (authorsList?.length > 0) {
        let unique = [...new Set(authorsList)];
        authorsList = unique.filter(y => ![null, ""].includes(y));
        setAuthorsList(authorsList);
      }


      if (params?.date) {
        articlesArray = articlesArray?.filter((date) => (moment(date?.publishedAt).format("YYYY-MM-DD") === params?.date));
        // console.log("articlesArray", articlesArray)
        setArticleData(articlesArray);
      } else {
        // console.log("articlesArray 2", articlesArray)
        setArticleData(articlesArray);
      }
      setLoader(false);
    } catch (error) {
      console.error("Error occured in fetch API", error);
    }
  };

  const onSavePreferences = (prefs) => {
    // console.log(prefs);
    setPreferences(prefs);
    fetchSearchDetails({ query: "", date: "", category: prefs?.category, source: prefs?.source });
  }

  const handleSearchArticles = (filters) => {
    // console.log(filters);
    fetchSearchDetails({ query: filters?.keyword, date: filters?.date, category: preferences?.category || "none" });
  };
  const setAuthorSelect = (value) => {
    if (value === "") return;
    // console.log(value);
    let filteredAuthors = masterData?.filter((val) => (val.author == value));
    // console.log("value", value, filteredAuthors, articleData);
    setArticleData(filteredAuthors);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={3} sx={{ marginTop: 0, width: "100%", marginLeft: 0, paddingLeft: 0, }}>
        {/* SearchBar Section */}
        <Grid
          item
          xs={12}
          sx={{
            position: { xs: 'sticky', sm: 'sticky' },
            top: { xs: 0, sm: 20 },
            padding: 2,
            paddingLeft: 0,
            boxShadow: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            zIndex: 10, // Ensures it stays on top during scrolling
          }}
        >
          <SearchBar onSearch={handleSearchArticles} preferences={preferences} authors={authorsList} setAuthorSelect={setAuthorSelect} />
        </Grid>

        {/* Preferences Section */}
        <Grid item xs={12} md={3} sx={{ paddingLeft: "0px !important", position: { xs: 'sticky', sm: 'sticky' }, }}>
          <Box
            sx={{
              position: { xs: 'sticky', sm: 'sticky' },
              top: { xs: 0, sm: 20, md: 130 },
              padding: 2,

              boxShadow: 3,
              backgroundColor: 'white',
              borderRadius: 2,
              zIndex: 5,
              marginTop: { xs: 2, sm: 0 }, // Adds spacing on mobile
            }}
          >
            <Preferences onSavePreferences={onSavePreferences} />
          </Box>
        </Grid>

        {/* ArticleList Section */}
        <Grid item xs={12} md={9} sx={{ paddingLeft: "0px !important", }}>
          <Box sx={{ position: 'relative', display: "flex", justifyContent: "center" }}>
            {loader
              ? <CircularProgress />
              : <ArticleList articles={articleData || []} />
            }
          </Box>

        </Grid>
      </Grid>
    </Container>
  );
};

export default memo(HomePage);
