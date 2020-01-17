const express    = require('express');
const favicon    = require('express-favicon');
const bodyParser = require('body-parser');
const fs         = require('fs');
const path       = require('path');
const moment     = require('moment');
const chalk      = require('chalk');
const util       = require('util');
 
const readFile_p = util.promisify(fs.readFile); // Convert fs.readFile into Promise version of same    
// const readFileAsync = promisify(fs.readFile)
const writeFile_p = util.promisify(fs.writeFile)
const readdir_p = util.promisify(fs.readdir)

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

app.get('/datos', async (req, res) => {
    // res.send('hello world 2');

    // console.log(
    //     require('./chats/chat_0.json')
    // );

    // console.log(
    //     fs.readdirSync(dir_chats)
    //         .filter(name => path.extname(name) === '.json')
    //         .map(   name => require("./" + path.join(dir_chats, name)))
    // );

    // resultado = fs.readdirSync(dir_chats)
    //     .filter(name => path.extname(name) === '.json')
    //     .map(   name => require("./" + path.join(dir_chats, name)));

    resultado = [];
    await Promise.all(
        fs.readdirSync(dir_chats)
        .filter(name => path.extname(name) === '.json')
        .map(  async file_name => {
            obj = null;
            await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
                try { obj = JSON.parse(data); } catch (e) {}
            });
            return obj;
        })
    ).then(
        values => {resultado = values;}
    );

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
var list_unordered_values_lastest = [];
var list_unordered_values_oldest  = [];

app.get('/indices', (req, res) => {

    // console.log(list_unordered_values_total);
    
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

        tmp_indices_lastest = 
            list_unordered_values_lastest
            .map((v, i) => {return {"v":v, "index":i}})
            .sort((a,b) => b.v - a.v)
            .map((v, i) => {return v.index})
            .reverse();

        tmp_indices_oldest = 
            list_unordered_values_oldest
            .map((v, i) => {return {"v":v, "index":i}})
            .sort((a,b) => a.v - b.v)
            .map((v, i) => {return v.index})
            .reverse();

            
        // console.log("total   ", list_unordered_values_total);
        // console.log("lastest ", list_unordered_values_lastest);
        // console.log("oldest  ", list_unordered_values_oldest);
        

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

async function process_text_file(input_name) {

    // console.log("process_text_file...");
    list_unordered_values_total   = [];
    // list_unordered_values_lastest = [];
    // list_unordered_values_oldest  = [];

    // console.log(input_name);

    // fs.readFile(input_name, 'utf8', function(err, data) {
    // fs.readFile(path.join(dir_process, input_name), 'utf8', function(err, data) {
    // await readFile_p(path.join(dir_process, input_name), 'utf8', async function(err, data) {
    // fs.readFile(path.join(dir_process, input_name), 'utf8', async function(err, data) {

    let data = await readFile_p(path.join(dir_process, input_name), 'utf8');

    if (1) {

        // if (err) throw err;
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
        
        info_displacement_begin = 0;
        info_displacement_begin = moment().diff(moment(splitted_data[0].split(" ")[0], "DD/MM/YYYY"), "days");
            
        console.log("Displacement range is: [", chalk.yellow(info_displacement_begin), ",", chalk.yellow(info_displacement), "] total messages:", chalk.yellow(total));
        // info_displacement = 0;

        // console.log( moment("4/5/19", "DD/MM/YYYY").diff(moment("3/5/19", "DD/MM/YYYY"), 'days') );


        obj = {
            nombre            : nombre_del_chat,
            datos_1           : array_final,
            tipo              : "whatsapp",
            displacement_days : info_displacement,
            total_mensajes    : total,
            start_day         : info_displacement_begin,
            // maximo_mensajes   : max,
        }

        // list_unordered_values_total.push(total)

        var json = JSON.stringify(obj);
        // console.log( input_name.split(".") );
        // fs.writeFile(path.join(dir_chats, input_name), json, 'utf8', function() {});
        // fs.writeFile(path.join(dir_chats, input_name), json, 'utf8', function() { console.log("file written");
        //  });
        // await fs.writeFile(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8', function() {});
        // fs.writeFile(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8', () => {});
        // await writeFile_p(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8', () => {console.log("Finished process_text_file"); return true;});
        // await writeFile_p(path.join(dir_chats, input_name), json, 'utf8');
        // await fs.writeFile(path.join(dir_chats, input_name), json, 'utf8');
        // await fs.writeFile(path.join(dir_chats, input_name), json, 'utf8', () => {});
        // console.log("Finished process_text_file");
        // await writeFile_p(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8')
        //     .then(() => {});
        await writeFile_p(path.join(dir_chats, input_name.split(".")[0] + ".json"), json, 'utf8');

        // console.log("gato");
        return true;
        // console.log("perro");

    }
    // })
    // .then(() => {console.log("finishing... process_text_file...");return true;});

    // console.log("finishing... process_text_file...");

    // return true;
}
 
app.post('/update_chats', async (req, res) => {

    // console.log(chalk.blue("0"));
    // list_unordered_values_total = [];

    // resultado = fs.readdirSync(dir_process)
    //     // .filter(name => path.extname(name) === '.txt')
    //     // .map(   name => require("./" + path.join(dir_process, name)));
    //     // .map(name => process_text_file(name));
    //     .map(name => {await process_text_file(name)});


    let  content = "";
    // // fs.readdir(dir_process, async (err, dir)=>{
    // let out = await readdir_p(dir_process, async (err, dir)=>{
    //     for(var i=0; i<dir.length; i++){
    //         // let fileName = dir[i];
    //         await process_text_file(dir[i]);
    //         console.log(chalk.blue("0." + i));
    //     }
    //     return true;
    // })

    let dir = await readdir_p(dir_process);
    for(var i=0; i<dir.length; i++){
        // let fileName = dir[i];
        await process_text_file(dir[i]);
        // console.log(chalk.blue("0." + i));
    }
    // return true;

    // console.log(chalk.blue("1"));


    // console.log(list_unordered_values_total);
    await load_indexes_jsonssss();
    // console.log(chalk.blue("2"));

    res.send('finished');
});


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function load_indexes_jsonssss() {
    console.log('Loading indexes of the json files...');

    list_unordered_values_total   = [];
    list_unordered_values_lastest = [];
    list_unordered_values_oldest  = [];

    // await Promise.all(
    //     fs.readdirSync(dir_chats).map(async file_name => {
    //         // console.log(chalk.blue(file_name));
    //         outname = -1;
    //         await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
    //             try {
    //                 obj     = JSON.parse(data);
    //                 outname = obj.total_mensajes;
    //             }
    //             catch (e) {
    //                 outname = -1;
    //             }
    //         });
    //         return outname;
    //     })
    // ).then(
    //     values => {list_unordered_values_total = values;}
    // );



    // await Promise.all(
    //     fs.readdirSync(dir_chats).map(async file_name => {
    //         // console.log(chalk.blue(file_name));
    //         outname = -1;
    //         await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
    //             try {
    //                 obj     = JSON.parse(data);
    //                 outname = obj.displacement_days;
    //             }
    //             catch (e) {
    //                 outname = -1;
    //             }
    //         });
    //         return outname;
    //     })
    // ).then(
    //     values => {list_unordered_values_lastest = values;}
    // );



    // await Promise.all(
    //     fs.readdirSync(dir_chats).map(async file_name => {
    //         // console.log(chalk.blue(file_name));
    //         outname = -1;
    //         await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
    //             try {
    //                 obj     = JSON.parse(data);
    //                 outname = obj.start_day;
    //             }
    //             catch (e) {
    //                 outname = -1;
    //             }
    //         });
    //         return outname;
    //     })
    // ).then(
    //     values => {list_unordered_values_oldest = values;}
    // );

    // await Promise.all(
    //     fs.readdirSync(dir_chats).map(async file_name => {
    //         console.log(chalk.blue(file_name));
    //         outname = -1;
    //         await readFile_p(path.join(dir_chats, file_name), 'utf8').then(data => {
    //             try {
    //                 obj     = JSON.parse(data);
    //                 outname = obj;
    //             }
    //             catch (e) {
    //                 outname = null;
    //             }
    //         });
    //         return outname;
    //     })
    // )
    // // .then(  values => {list_unordered_values_oldest = values;})
    // // .filter(x      => x) // Filters out null values
    // // .then(  values => values.filter(v => v))
    // .then(  values => {
    //     list_unordered_values_total   = values.total_mensajes;
    //     list_unordered_values_lastest = values.displacement_days;
    //     list_unordered_values_oldest  = values.start_day;
    // });




    let  content = "";
    fs.readdir(dir_chats, (err, dir)=>{
        for(var i=0; i<dir.length; i++){
            let fileName = dir[i];
            let filePath=dir_chats+"/"+fileName;
            // console.log("A: "+fileName);
            stat = fs.statSync(filePath);
            if(stat.isFile()){
                // console.log("B: "+fileName);
                // // fs.readFileSync(filePath, 'utf8', function (err,data) {
                // fs.readFile(filePath, 'utf8', function (err,data) {
                // // readFile(path.join(dir_chats, file_name), 'utf8').then(data => {
                //     if (err) {
                //         console.log(err);
                //     }
                //     console.log("C: "+ fileName);
                //     // mainWindow.webContents.send('getContent' , {msg:data});
                // });

                var cosa = fs.readFileSync(filePath, 'utf8');
                // console.log(cosa);
                var my_out = JSON.parse(cosa);

                list_unordered_values_total.push(   my_out.total_mensajes    )
                list_unordered_values_lastest.push( my_out.displacement_days )
                list_unordered_values_oldest.push(  my_out.start_day         )
                
            }
        }
    })


    // console.log("...");
    // console.log(list_unordered_values_total);    
    // console.log("...");
    loaded = true;
}

console.log("Updating chats...");
// resultado = fs.readdirSync(dir_process).map(name => process_text_file(name));

load_indexes_jsonssss();


app.listen(port, () => console.log(`Example app listening on port ${port}!`))




//
