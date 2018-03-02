const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    knex('books').then((results) => {
      console.log(results)
      res.render('index', {db_array:results})
    })
  },

  addbookget: function(req, res) {
    res.render("addbook");
  },

  addbookpost: function(req, res) {
    console.log(req.body.title)
    knex('books').insert({
      title: req.body.title,
      img_url: req.body.imgurl,
      description: req.body.description,
    })
      .then(() => {
        res.redirect('/')
      })
  },

  newauthor: function(req, res) {
    res.render("newauthor");
  },

  discussionget: function(req, res) {
    knex('books').innerJoin('comments', 'books.id', 'comments.book_id').where('books.id', req.params.id)
    .then((results) => {
      if (results.length === 0) {
        knex('books').where('books.id', req.params.id).then((results) => {
          res.render('discussion', {db_array:results})
        })
      } else {
        console.log(results)
        res.render('discussion', {db_array:results})
      }
    })
  },

  discussionpost: function(req, res) {
    console.log(req.body.title)
    knex('comments').insert({
      commenter: req.body.commenterName,
      comment_content: req.body.commentContent,
      book_id: req.params.id
    })
      .then(() => {
        res.redirect(`/discussion/${req.params.id}`)
      })
  },
}
