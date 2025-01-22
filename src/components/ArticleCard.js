import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';

const ArticleCard = ({ article }) => {

  return (
    <Card sx={{ marginBottom: 2, cursor: "pointer" }} onClick={() => { window.open(article?.url, "_blank") }}>
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {article?.description}
        </Typography>
        {article?.publishedAt && (
          <Box sx={{display:"flex", justifyContent:"flex-end"}}>
            <Typography variant="caption" display="block" color="text.secondary">
              {"Published on: " + moment(article?.publishedAt).format("MMM Do YYYY")}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
};

// const ArticleList = ({ articles }) => {
//   return (
//     <div>
//       {articles?.map((article) => (
//         <ArticleCard key={article.id} article={article} />
//       ))}
//     </div>
//   );
// };

export default ArticleCard;
