import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';

import { DB, APP_PORT } from './config';
import todoRoutes from './routes';

const app = express();

// Connect to database
mongoose.connect(DB, { useNewUrlParser: true });

// Sends static files  from the public path directory
app.use(express.static(join(__dirname, '/public')))

// Use morgan to log request in dev mode
app.use(morgan('dev'))

app.use(json())

app.use(urlencoded({ extended: true }))

//  Use routes defined in Route.js and prefix it with api
app.use('/api', todoRoutes)

// returns 404 for unknown routes
app.all('/api*', (req, res) => {
  res.status(404).send('The api route you requested does not exist');
});

let port = APP_PORT || 4000

app.listen(port) // Listen on port defined in config file

console.log('App listening on port ' + port)
