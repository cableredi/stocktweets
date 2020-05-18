require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require('./error-handler');
const tweetsRouter = require('./tweets-router');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use('/api/tweets', tweetsRouter);

app.get('/', (req, res) => {
  res.json({ok: true});
});

app.use(errorHandler);

module.exports = app;
