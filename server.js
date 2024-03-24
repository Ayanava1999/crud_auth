
const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORTNUMBER;

const db = require("./db");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
  next();
};

// Authentication using Passport
const localAuthMiddleware = require('./authintication/auth');
app.use(localAuthMiddleware.initialize());

//customer Routes
const customerRoutes = require('./Routes/CustomerRoutes');
app.use('/customer', customerRoutes);

//Home route with local authintication using passport
app.get('/home', localAuthMiddleware.authenticate('local', { session: false }), function(req, res) {
  res.send('Hello World');
});

app.use(logRequest);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
