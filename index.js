import express from 'express';
import morgan from 'morgan';
import { join } from 'path';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';

import { DB, APP_PORT } from './app/config';
import todoRoutes from './app/Routes';

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

// Server index.html page when request to the root is made
app.get('/', (req, res, next) => {
  res.sendfile('./public/index.html')
})

let port = APP_PORT || 4000

app.listen(port) // Listen on port defined in config file

console.log('App listening on port ' + port)
