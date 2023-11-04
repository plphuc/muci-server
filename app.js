import cors from 'cors';
import express from 'express';
import routes from './routes/index.js'
import { errorConverter, errorHandler } from './middlewares/handleError.js';

const app = new express();

app.use(cors());
app.use(express.json());

// app.use('/uploadImage', routes.saveImgRouter);
app.use('/', routes)

// convert error to ApiError
app.use(errorConverter)
// handle error
// app.use(errorHandler)

export default app;
