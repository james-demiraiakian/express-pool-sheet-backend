const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());
app.use(require('cookie-parser')());
app.use(
  require('cors')({
    origin: ['http://localhost:7891', 'http://localhost:3000'],
    credentials: true,
  })
);
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/tournaments', require('./controllers/tournaments'));
app.use('/api/v1/fencers', require('./controllers/fencers'));
app.use('/api/v1/bouts', require('./controllers/bouts'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
