import cors from 'cors';
import express from 'express';
import routes from './routes/index.js'
const app = new express();

app.use(cors());
app.use(express.json());

// app.use('/uploadImage', routes.saveImgRouter);
app.use('/', routes)

export default app;
