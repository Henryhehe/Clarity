const express = require('express');
const path = require('path');
const compression = require('compression');
const morgan = require('morgan');
// Router Imports
const authRouter = require('./server/routes/auth.router');
const usersRouter = require('./server/routes/users.router');
// Middleware
const authMiddleware = require('./server/middleware/auth.middleware');

// Setting the default handler for errors
process.on('uncaughtException', (error) => {
  console.error(error);
  console.error('Destroying application');
  // Death timer
  // Ensure process exits if timeout is exceeded.
  setTimeout(() => {
    console.error('Timeout exceeded (500 ms). Process will terminate now.');
    process.exit(1); // eslint-disable-line no-process-exit
  }, 500);
});
// Globals
const port = process.env.PORT || 5000;

// TODO: Initialize app configuration

const app = express();
require('dotenv').config();
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'src/build')));

// Load configuration

// Middleware
app.use(compression());
app.use(morgan(':method :url status :status :res[content-length] - :response-time ms'));
// Routers and controllers
app.get('/api/monitor', (req, res) => {
  res.json({
    status: 'Running',
    time: Date.now(),
  });
});

// Put all API endpoints under '/api'

app.use('/api/auth', authRouter);
app.use('/api/users', authMiddleware.verifyJWT, usersRouter);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/src/build/index.html`));
});

app.listen(port, () => {
  console.log(`Express Server listening on: http://localhost:${port}`);
});

