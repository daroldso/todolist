var config = require('../../config');
const google = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { clientId, clientSecret, redirectUrl } = config.gapi;
const oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
var calendar = google.calendar('v3');

var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
];

exports.client = oauth2Client;

/**
 * Redirect user to Google Auth
 */
exports.authorize = function(req, res) {
  let authUrl = getAuthUrl();
  res.redirect(authUrl);
};

/**
 * Handle redirection after user return from Google Auth
 */
exports.oauth2callback = function(req, res) {
  const code = req.query.code;
  if (code) {
    oauth2Client.getToken(code, function(err, tokens) {
      if (!err) {
        oauth2Client.setCredentials(tokens);
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
};

/**
 * Get url that asks permissions for Google+ and Google Calendar scopes
 *
 * @return {url} oauth2Client The OAuth2 client to get token for.
 */
function getAuthUrl() {
  const url = oauth2Client.generateAuthUrl({
    scope: scopes
  });

  return url;
}

/**
 * Lists the next 10 events on the user's primary calendar and execute callback
 * function, pass in the either the result or error
 *
 * @param {function} callback Callback function to call with result or error
 */
exports.listEvents = function(callback) {
  calendar.events.list(
    {
      auth: oauth2Client,
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    },
    function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
        return;
      }
      var events = response.items;
      callback(null, events);
    }
  );
};

exports.createEvents = function(event, callback) {
  calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event
    },
    function(err, event) {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
      }
      console.log('Event created: %s', event.htmlLink);
      callback(null, event);
    }
  );
};

exports.deleteEvent = function(eventId, callback) {
  calendar.events.delete(
    {
      auth: oauth2Client,
      calendarId: 'primary',
      eventId: eventId
    },
    function(err, event) {
      if (err) {
        console.log('The API returned an error: ' + err);
        callback(err);
      }
      console.log('Event deleted');
      callback(null);
    }
  );
};
