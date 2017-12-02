import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';
import Raven from'raven';

/* eslint-disable no-console */

const port = 3000;
const app = express();

// Must configure Raven before doing anything else with it
// DSN can be found in https://sentry.io/tomohiro-nakagawa/js-dev-env/settings/keys/
const dsn = 'https://c74465110646402090e91ba4f99c4881:01f46686830a42fe8bc0defa0c972076@sentry.io/253615';
Raven.config(dsn).install();

// The request handler must be the first middleware on the app
app.use(Raven.requestHandler());
app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.get('/users', function(req, res){
  res.json([
    {"id":1, "firstName":"Bob", "lastName":"Smith", "email": "bob@gmail.com"},
    {"id":2, "firstName":"Tammy", "lastName":"Norton", "email": "tammy@gmail.com"},
    {"id":3, "firstName":"Tina", "lastName":"Lee", "email": "lee@gmail.com"}
  ]);
});


// The error handler must be before any other error middleware
app.use(Raven.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) { //eslint-disable-line no-unused-vars
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + '\n');
});

app.listen(port, function(err){
  if(err){
    console.log(err);
  }else{
    open('http://localhost:' + port);
  }
})
