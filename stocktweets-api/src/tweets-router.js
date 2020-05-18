const express = require('express');
const tweetsRouter = express.Router();
const fetch = require('node-fetch');


tweetsRouter
  .route('/:ticker')

  .get((req, res) => {
    const baseURL = 'https://api.stocktwits.com/api/2/streams/symbol/';

    const apiUrl = `${baseURL}${req.params.ticker}.json`;

    console.log('apiUrl', apiUrl);
    
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