/**
* App entrypoint.
*/
'use strict';

let app = require('express')();
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const initialRoutes = require('./server/routes');

const PORT = process.env.PORT || 3000;

// Set up Express.
require('./server/setup/express')(app);

// Set up MongoDB.
require('./server/setup/mongoose')();

// Set up routes.
app.use('/', initialRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start app.
app.listen(PORT, function() {
  console.log('App now listening on port ' + PORT);
});

module.exports = app;
