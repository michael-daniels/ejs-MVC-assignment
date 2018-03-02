//Update the name of the controller below and rename the file.
const template = require("../controllers/template.js")
module.exports = function(app){

  app.get('/', template.index);

  app.post('/addbook', template.addbookpost);

  app.get('/addbook', template.addbookget);

  app.post('/newauthor', template.newauthorpost);

  app.get('/newauthor', template.newauthorget);

  app.post('/discussion/:id', template.discussionpost);

  app.get('/discussion/:id', template.discussionget);

}
