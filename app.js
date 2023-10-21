import cors from 'cors';
import express from 'express';
import * as routes from './routes/index.js'
const app = new express();

app.use(cors());
app.use('/uploadImage', routes.saveImgRouter);

export default app;
