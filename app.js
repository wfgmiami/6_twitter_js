const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const swig = require('swig');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const bodyParser = require('body-parser');

const app = express();
const logger = morgan('dev');

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

swig.setDefaults({ cache: false });

app.use(logger);

// app.use(( req, res, next) => {
//   var mimeType = mime.lookup(req.path);

//   fs.readFile('./public' + req.path, (err, fileBuffer) => {
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   })
// })


app.use('/', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

const port = process.env.port || 3000;
app.listen( port, () => console.log( `listening on port ${ port }` ));


