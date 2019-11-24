const express    = require('express');
const favicon    = require('express-favicon');
const bodyParser = require('body-parser');
const fs         = require('fs');
const path       = require('path');
const moment     = require('moment');
const chalk      = require('chalk');
const util       = require('util');
 
const readFile_p = util.promisify(fs.readFile); // Convert fs.readFile into Promise version of same    

// var React = require('react');
// var ReactDOM = require('react-dom');
// var App = require('./components/App')

const dir_chats   = './chats';
const dir_process = './chats_to_process';

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

    // console.log(
    //     require('./chats/chat_0.json')
    // );

    // console.log(
    //     fs.readdirSync(dir_chats)
    //         .filter(name => path.extname(name) === '.json')
    //         .map(   name => require("./" + path.join(dir_chats, name)))
    // );

    resultado = fs.readdirSync(dir_chats)
        .filter(name => path.extname(name) === '.json')
        .map(   name => require("./" + path.join(dir_chats, name)));


    // console.log(resultado);
    res.send(resultado);
    // res.send(
    //     [
    //         {nombre:"coso", datos_1:[0, 0, 10, 10, 20, 30]},
    //         {nombre:"cosis",datos_1:[0, 0, 50, 60, 20, 30]}
    //     ]
    // );
});


var loaded = false;
var list_unordered_values_total   = [];
var list_unordered_values_first   = [];
var list_unordered_values_lastest = [];

app.get('/indices', (req, res) => {

    console.log(list_unordered_values_total);
    
    if (loaded) {

        // console.log(
        //     list_unordered_values_total.map((v, i) => {return {"v":v, "i":i}})
        // );
        
        // console.log(
        //     list_unordered_values_total
        //     .map((v, i) => {return {"v":v, "index":i}})
        //     .sort((a,b) => b.v - a.v)
        //     .map((v, i) => {return v.index})
        // );
        
        var tmp_indices_alphabetical = [];
        var tmp_indices_most         = [];
        var tmp_indices_lastest      = [];
        var tmp_indices_oldest       = [];

        tmp_indices_alphabetical = 
            list_unordered_values_total
            .map((v, i) => {return i});

        tmp_indices_most = 
            list_unordered_values_total
            .map((v, i) => {return {"v":v, "index":i}})
            .sort((a,b) => b.v - a.v)
            .map((v, i) => {return v.index});

        resultado = {
            indices_alphabetical:tmp_indices_alphabetical,
            indices_most        :tmp_indices_most        ,
            indices_lastest     :tmp_indices_lastest     ,
            indices_oldest      :tmp_indices_oldest      ,
        };
    }
    else {
        resultado = {
            indices_alphabetical:[0, 1, 6, 5],
            indices_most        :[],
            indices_lastest     :[],
            indices_oldest      :[],
        };
    }
    
    res.send(resultado);
});

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

function process_text_file(input_name) {

    console.log("Reconstructing chats !");
    // console.log(input_name);

    // fs.readFile(input_name, 'utf8', function(err, data) {
    fs.readFile(path.join(dir_process, input_name), 'utf8', function(err, data) {
        if (err) throw err;
        console.log("Processing..." + input_name);
        // console.log('OK: ' + input_name);
        // console.log(data)
        // console.log(data.split("\n"))

        nombre_del_chat = input_name;
        if (input_name.startsWith("Chat de WhatsApp con")) {
            nombre_del_chat = nombre_del_chat.substr(20, 500).split(".")[0];
        }

        // data.split("\n")
        var total = 0;

        // console.log(moment("12-25-1995", "MM-DD-YYYY"));
        // console.log(moment("4/5/19", "DD/MM/YYYY"));

        // var a = moment([2007, 0, 29]);
        // var b = moment([2007, 0, 28]);
        // a.diff(b, 'days')   // =1
        var splitted_data = data.split("\n").filter(name => name);
        // console.log(splitted_data);
        // console.log(splitted_data[splitted_data.length -1]);

        d_inicio = moment(splitted_data[0].split(" ")[0], "DD/MM/YYYY")
        // d_final  = moment(splitted_data.last().split(" ")[0], "DD/MM/YYYY")
        d_final  = moment(splitted_data[splitted_data.length -1].split(" ")[0], "DD/MM/YYYY")

        // console.log(d_inicio);
        // console.log(d_final );
        days = d_final.diff(d_inicio, 'days')

        // console.log(days);
        // console.log(".......");
        var array_final = Array(days+1).fill(0);

        for (var i = 0; i < splitted_data.length; i++) {
            // splitted_data[i]
            // console.log("processing...", splitted_data[i]);
            // console.log( moment(splitted_data[i].split(" ")[0], "DD/MM/YYYY").diff(d_inicio ,'days') )
            array_final[ moment(splitted_data[i].split(" ")[0], "DD/MM/YYYY").diff(d_inicio ,'days') ]++;
            total++;
        }

        info_displacement = 0;
        info_displacement = moment().diff(moment(splitted_data[splitted_data.length -1].split(" ")[0], "DD/MM/YYYY"), "days");
        console.log("Days displacement is:", chalk.yellow(info_displacement), "total messages:", chalk.yellow(total));
        // info_displacement = 0;

        // console.log( moment("4/5/19", "DD/MM/YYYY").diff(moment("3/5/19", "DD/MM/YYYY"), 'days') );


        obj = {
            nombre            : nombre_del_chat,
            datos_1           : array_final,
            tipo              : "whatsapp",
            displacement_days : info_displacement,
            total_mensajes    : total,
            // maximo_mensajes   : max,
        }

        list_unordered_values_total.push(total)

        var json = JSON.stringify(obj);
        // console.log( input_name.split(".") );
        // fs.writeFile(path.join(dir_chats, input_name), json, 'utf8', function() {});
        fs.writeFile(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8', function() {});
        console.log("");
    });

    return true;
}

app.post('/update_chats', (req, res) => {

    // console.log("begin");
    // list_unordered_values_total = [];

    resultado = fs.readdirSync(dir_process)
        // .filter(name => path.extname(name) === '.txt')
        // .map(   name => require("./" + path.join(dir_process, name)));
        .map(name => process_text_file(name));

    // console.log(list_unordered_values_total);

    res.send('finished');
});


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function load_indexes_jsonssss() {
    console.log('Loading indexes of the json files...');

    await Promise.all(
        fs.readdirSync(dir_chats).map(async file_name => {
            // console.log(chalk.blue(file_name));
            outname = -1;
            await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
                obj     = JSON.parse(data);
                outname = obj.total_mensajes;
            });
            return outname;
        })
    ).then(
        values => {list_unordered_values_total = values;}
    );

    // console.log(list_unordered_values_total);
    
    loaded = true;
}

console.log("Updating chats...");
// resultado = fs.readdirSync(dir_process).map(name => process_text_file(name));

load_indexes_jsonssss();


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




//
