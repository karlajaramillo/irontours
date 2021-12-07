require('./db').connectDb();

const app = require('express')();

require('./config').config(app);
require('./config/session.config').sessionInit(app);

app.use((req, res, next) => {
  console.log('session', req.session);
  next();
});

const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

const tourRoutes = require('./routes/tour.routes');
app.use('/', tourRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

module.exports = app;
