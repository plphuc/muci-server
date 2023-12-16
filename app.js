import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import { errorConverter, errorHandler } from './middlewares/handleError.js';
import bodyParser from 'body-parser';

const app = new express();

app.use(cors());
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);

app.get('/', function (req, res) {
  res.json({
    username: 'squidysupervip',
    name: 'Thành Vũ',
    email: 'vcngthnh@gmail.com',
    password: '/PYYN/k0DAPFIjCqiNB/tgi/GbH6GI6/LiIhfRoSl4Y=',
  });
});

// convert error to ApiError
app.use(errorConverter);
// handle error
app.use(errorHandler);

export default app;
