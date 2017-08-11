const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', (req, res, next) =>{
  let allTheTweets = tweetBank.list();
  res.render( 'index', {tweets: allTheTweets})

})


router.get('/users/:name', (req, res, next) => {
  var tweetsForName = tweetBank.find({ name: req.params.name })
  res.render('index', { tweets: tweetsForName })
})

router.post('/tweets', (req, res, next) => {

})

module.exports = router;


