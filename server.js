const express    = require('express');
const favicon    = require('express-favicon');
const bodyParser = require('body-parser');



// var React = require('react');
// var ReactDOM = require('react-dom');
// var App = require('./components/App')



const port = 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
// app.use(favicon(__dirname + '/public/favicon.png'));

app.use("/dist", express.static('dist'))
app.use("",      express.static('public'))

app.get('/', (req, res) => {
    res.sendfile('public/index.html');
});

app.post('/', (req, res) => {
  // res.sendfile('public/index.html');
  res.send('hello world');
});

app.get('/datos', (req, res) => {
    // res.send('hello world 2');
    res.send(
        [
            {nombre:"coso", datos_1:[0, 0, 10, 10, 20, 30]},
            {nombre:"cosis",datos_1:[0, 0, 50, 60, 20, 30]}
        ]
    );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




//
