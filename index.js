import cors from 'cors';
import express from 'express';
import 'dotenv/config';

const app = new express();
const port = process.env.PORT;
const mongodbUri = process.env.URIMONGODB;

// Connect to MongoDB

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
