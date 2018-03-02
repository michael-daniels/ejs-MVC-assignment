const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    knex('books').orderBy('id', 'desc').then((results) => {
      console.log(results)
      res.render('index', {db_array:results})
    })
  },

  addbookget: function(req, res) {
    knex('authors').orderBy('id', 'desc').then((results) => {
      res.render("addbook", {author_array:results});
    })
  },

  addbookpost: function(req, res) {
    console.log(req.body.title)
    knex('books').insert({
      title: req.body.title,
      img_url: req.body.imgurl,
      description: req.body.description,
      author_id: req.body.author_id
    })
      .then(() => {
        res.redirect('/')
      })
  },

  newauthorget: function(req, res) {
    res.render("newauthor");
  },

  newauthorpost: function(req, res) {
    knex('authors').insert({
      name: req.body.name,
      bio: req.body.bio
    }).then(() => {
      res.redirect("/addbook");
    })

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
