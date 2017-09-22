'use strict';

const google = require('googleapis');
const gapi = require('../gapi');

let todos = {};

todos.create = function(req, res) {
  const calEvent = req.body;

  calEvent.start = calEvent.end = {
    date: calEvent.date,
    timeZone: 'Asia/Hong_Kong'
  };

  gapi.createEvents(calEvent, (err, calEvent) => {
    if (err) {
      res.status(403).send('You need to authenticate first');
      return;
    }
    res.send(calEvent);
  });
};

todos.show = function(req, res) {
  gapi.listEvents((err, events) => {
    if (err) {
      res.status(403).send('You need to authenticate first');
      return;
    }
    res.send(events);
  });
};

todos.remove = function(req, res) {
  const eventId = req.params.id;

  gapi.deleteEvent(eventId, (err, event) => {
    if (err) {
      res.status(403).send('You need to authenticate first');
      return;
    }
    res.send();
  });
};

module.exports = todos;
