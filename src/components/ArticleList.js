import React from 'react';
import { Container, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles }) => {
  if (!articles?.length) {
    return (
      <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2, marginLeft: "2rem", marginBottom: "2rem" }}>
        No articles found. Please adjust your search criteria.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      {articles?.map((article) => (
        <ArticleCard key={article.publishedAt || article.url} article={article} />
      ))}
    </Container>
  );
};

export default ArticleList;
