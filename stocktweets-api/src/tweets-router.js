const express = require('express');
const tweetsRouter = express.Router();
const fetch = require('node-fetch');


tweetsRouter
  .route('/:ticker/:maxId?')

  .get((req, res) => {
    const ticker = req.params.ticker;

    const baseURL = 'https://api.stocktwits.com/api/2/streams/symbol/';
    let apiUrl = `${baseURL}${ticker}.json`;

    if (req.params.maxId) {
      apiUrl = apiUrl + `?since=${req.params.maxId}`;
    }
    
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      res.send( { data });
    })
    .catch(err => {
      res.redirect('/error');
    })
  })


module.exports = tweetsRouter;