'use strict';

const todos = require('./controllers/todos');
const gapi = require('./gapi');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.render('index');
  });
  app.get('/todos', todos.show);
  app.post('/todos', todos.create);
  app.get('/createtodos', todos.create);
  app.delete('/todos/:id', todos.remove);

  app.get('/auth', gapi.authorize);
  app.get('/oauth2callback', gapi.oauth2callback);
};
