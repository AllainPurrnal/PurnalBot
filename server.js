const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const server = client => {
  const app = express();

  // Middleware
  app.use(express.json());

  const db = process.env.MONGODB_URI;

  mongoose.connect(db, { useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true })
    .then(console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

  // Use routes
  app.use('/api/reports', require('./routes/api/reports'))

  return app;
}

exports.server = server;