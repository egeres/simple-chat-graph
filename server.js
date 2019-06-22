const express    = require('express');
const favicon    = require('express-favicon');
const bodyParser = require('body-parser');

// var React = require('react');
// var ReactDOM = require('react-dom');
// var App = require('./components/App')



const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(favicon(__dirname + '/public/favicon.png'));

app.use("/dist", express.static('dist'))
app.use("",      express.static('public'))

app.get('/', (req, res) => {
  // res.send({ express: 'Hello From Express' });
  res.sendfile('public/index.html');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




//
