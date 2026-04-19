const express = require('express');
const jokesRouter = require('./routes/jokes');

const app = express();

app.use(express.json());
app.use('/', jokesRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

module.exports = app;
