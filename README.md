## Setup
Install npm packages
```
npm install
```
OR
```
yarn
```

## Run the application
To run the application in production mode, run
```
npm start
```
and browse to [http://localhost:3000](http://localhost:3000)

## Authorize with Google Calendar API
To use this application, you will need to authorize with Google to grant this application read/write access to your Google Calendar. The scopes are defined in `src/server/gapi.js`. The application will not modify any of your calendar items by itself.

## Using the application
After granting permission, the application will list your 10 most recent upcoming event. You can add new calendar event and delete any existing events you see in the list.

## Development
To enter development mode, run
```
npm run dev
```
