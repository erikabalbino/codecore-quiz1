const express = require('express');
const knex = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cluckr/index');

});

router.post('/', (req, res) => {

  const description = req.body.description;
  const pictureUrl = req.body.pictureUrl;
  const username = req.cookies.username;

  if (description || pictureUrl) {
    knex
    .insert({
      content: description,
      image_url: pictureUrl,
      username: username,
    })
    .into('clucks')
    .then(() => {
      res.redirect('/cluckr/show');
    });
  } else {
    res.redirect('/cluckr');

    // res.render('cluckr/index', { clucks });
  }
});

router.get('/show', function (req, res, next) {
  knex
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .then(clucks => {
      console.log(clucks);

      // res.render('tasks/index', { tasks: 'hello' });
      res.render('cluckr/show', { clucks });
    });

});

router.post('/cluckr/show', function (req, res, next) {

  knex
    .select()
    .from('clucks')
    .orderBy('created_at', 'DESC')
    .then(clucks => {
      // console.log(clucks);
      res.redirect('/cluckr');
    });
});

module.exports = router;
