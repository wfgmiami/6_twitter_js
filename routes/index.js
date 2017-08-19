module.exports = function(io){

  const express = require('express');
  const router = express.Router();
  const tweetBank = require('../tweetBank');

  router.get('/', (req, res, next) =>{
    let allTheTweets = tweetBank.list();
    res.render( 'index', { tweets: allTheTweets, showForm: true })

  })

  router.get('/users/:name', (req, res, next) => {
    var tweetsForName = tweetBank.find({ name: req.params.name })
    res.render('index', { tweets: tweetsForName, username: req.params.name, showForm: true })
  })

  router.get('/tweets/:id', (req, res, next) => {
    var tweetsForId = tweetBank.find( { id: req.params.id * 1});
    res.render('index', { tweets: tweetsForId })
  })

  router.post('/tweets', (req, res, next) => {
    tweetBank.add(req.body.name, req.body.text);
    io.sockets.emit('newTweet', { name: req.body.name, text: req.body.text })
    res.redirect('/');
  })



  return router;
}


