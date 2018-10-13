import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { DB, APP_PORT } from './config';
import routes from './routes/index';

const port = APP_PORT || 4000

const app = express();

app.use(cors({
  origin: 'http://localhost:8000'
}));

// Connect to database
mongoose.connect(DB, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// Use morgan to log request in dev mode
app.use(logger('dev'))

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

// Setup a default catch-all route that sends back a welcome message
app.get('/', (req, res) => res.status(200)
  .send({
    message: 'Welcome to the TODO API'
  }));

app.use('*', (req, res) =>
  res.send({
    message: 'The API route you requested does not exist'
  }));

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App running on port ${port}`);
});

export default app;
