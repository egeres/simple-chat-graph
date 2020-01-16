import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';
// import chat_0  from '../chats/chat_0.json';
// import Cookies from 'js-cookie';
// import * as Cookies from 'js-cookie';
const Cookies = require('js-cookie');
// var Cookies   = require('js-cookie');

const eva     = require('eva-icons');


// console.log(".................");
// console.log(Cookies);
// console.log(Cookies.get('days_width'));
// console.log(typeof Cookies.get('days_width')    !== "undefined" );
// console.log(".................");

console.log("loading the new index");
let global_data    = null;
let global_indices = null;
let graph_width    = 2000;
let days_width     = 4;
let global_hidden  = true;
let interpolate_color_function = d3.interpolateYlOrRd;

if (Cookies.get('days_width')    && (typeof Cookies.get('days_width')    !== "undefined")) { days_width    = Cookies.get('days_width'); }
if (Cookies.get('global_hidden') && (typeof Cookies.get('global_hidden') !== "undefined")) { global_hidden = Cookies.get('global_hidden'); }

// Cookies.get('contenedor_instancias_columns');
// if (!Cookies.get('theme') || Cookies.get('theme') == "dark")
// Cookies.set('theme', 'clear');

function ui_update_variables() {
    console.log('updating vars...');
    
    if (Cookies.get('days_width') && (typeof Cookies.get('days_width') !== "undefined"))
    {
        document.getElementById("value_days_width").innerHTML = Cookies.get('days_width').toString();
    }
    
    if (global_hidden === "true" || global_hidden === true) 
    { document.getElementById('btn-visible').setAttribute("data-eva", "eye-off-outline"); }
    else
    { document.getElementById('btn-visible').setAttribute("data-eva", "eye-outline"); }

    if (global_hidden === "true" || global_hidden === true) { 
        var children = document.getElementById('panel_names').children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.add("text_hidden");
        }
    }
    else { 
        var children = document.getElementById('panel_names').children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.remove("text_hidden");
        }
    }

    // Eva icons de estos
    eva.replace({fill:"#fff"})
}

function ui_property_days_width_increase() {
    console.log("Incresaing...");
    
    if      (days_width == 1 ) { days_width = 2 ; }
    else if (days_width == 2 ) { days_width = 4 ; }
    else if (days_width == 4 ) { days_width = 8 ; }
    else if (days_width == 8 ) { days_width = 24; }
    else if (days_width == 24) { days_width = 37; }
    else { days_width = 4; }
    Cookies.set('days_width', days_width);

    ui_update_variables();
}

function ui_property_days_width_decrease() {
    console.log("Decreasing...");

    if      (days_width == 2 ) { days_width = 1 ; }
    else if (days_width == 4 ) { days_width = 2 ; }
    else if (days_width == 8 ) { days_width = 4 ; }
    else if (days_width == 24) { days_width = 8 ; }
    else if (days_width == 37) { days_width = 24; }
    else { days_width = 4; }
    Cookies.set('days_width', days_width);

    ui_update_variables();
}

function ui_property_toggle_hidden() {
    // eye-off-outline
    // if   (global_hidden  === "true") { global_hidden = false; document.getElementById('btn-visible').setAttribute("data-eva", "eye-outline"); }
    // else                             { global_hidden = true;  document.getElementById('btn-visible').setAttribute("data-eva", "eye-off-outline"); }
    
    if (global_hidden  === "true" || global_hidden === true) 
    { global_hidden = false; }
    else
    { global_hidden = true;  }

    Cookies.set('global_hidden', global_hidden);
    
    ui_update_variables()

    // data-eva="eye-outline"
    // eye-off-outline
    // eva.replace({fill:"#fff"})
    // Cookies.set('global_hidden', global_hidden);
}

function ui_order_by_alphabetical() {

    console.log("Ordering by alphabet...");

    var list_reference  = document.getElementById('panel_names');
    
    var newOrder = global_indices.indices_alphabetical;
    console.log(newOrder);
    
    for(let i=0;i<newOrder.length;i++) {

        // console.log(i);
        
        for (let j = 0; j < list_reference.children.length; j++) {
            const element_j = list_reference.children[j];            
            if(element_j.classList.contains("index_" + newOrder[i].toString())   ){ 
                list_reference.appendChild(element_j);
            }
        }
    }

    reorder_right_list();
}

function ui_order_by_most() {
    console.log("Ordering by most...");
    var list_reference  = document.getElementById('panel_names');
    var newOrder = global_indices.indices_most;
    for(let i=0;i<newOrder.length;i++) {
        for (let j = 0; j < list_reference.children.length; j++) {
            const element_j = list_reference.children[j];            
            if(element_j.classList.contains("index_" + newOrder[i].toString())   ){ 
                list_reference.appendChild(element_j);
            }
        }
    }
    reorder_right_list();   
}

function ui_order_by_lastest() {
    console.log("Ordering by lastest...");
    var list_reference  = document.getElementById('panel_names');
    var newOrder = global_indices.indices_lastest;
    for(let i=0;i<newOrder.length;i++) {
        for (let j = 0; j < list_reference.children.length; j++) {
            const element_j = list_reference.children[j];            
            if(element_j.classList.contains("index_" + newOrder[i].toString())   ){ 
                list_reference.appendChild(element_j);
            }
        }
    }
    reorder_right_list();   
}

function ui_order_by_oldest() {
    console.log("Ordering by oldest...");
    var list_reference  = document.getElementById('panel_names');
    var newOrder = global_indices.indices_oldest;
    for(let i=0;i<newOrder.length;i++) {
        for (let j = 0; j < list_reference.children.length; j++) {
            const element_j = list_reference.children[j];            
            if(element_j.classList.contains("index_" + newOrder[i].toString())   ){ 
                list_reference.appendChild(element_j);
            }
        }
    }
    reorder_right_list();   
}

function assign_indexes() {
    console.log("Assigning indexes...");
    
    var array = document.getElementById("panel_names").children;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log(element);
        element.classList.add("index_" + index.toString());
    }

    var array = document.getElementById("panel_histories").children;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        // console.log(element);
        element.classList.add("index_" + index.toString());
    }
}

function update_chats() {
    console.log("Updating chats...");

    fetch('/update_chats', {method:'post'})
}


// Hacky, needs to be removed !
window.ui_property_days_width_increase = ui_property_days_width_increase;
window.ui_property_days_width_decrease = ui_property_days_width_decrease;
window.ui_property_toggle_hidden       = ui_property_toggle_hidden;

window.ui_update_variables             = ui_update_variables;
window.update_chats                    = update_chats;
window.ui_order_by_alphabetical        = ui_order_by_alphabetical;
window.ui_order_by_most                = ui_order_by_most;
window.ui_order_by_lastest             = ui_order_by_lastest;
window.ui_order_by_oldest              = ui_order_by_oldest;

class Row_name extends React.Component {

    componentDidMount() {}

    render() {
        return (
            <div class="row_name">
                <i data-eva='more-vertical-outline' class="spann" data-eva-width="25"></i>
                {this.props.name}
            </div>
        );
    }

}

class Row_graph extends React.Component {

    componentDidMount() {
        // console.log('mounting...');
        // console.log(this.props.my_index);
        // console.log(global_data[this.props.my_index].datos_1);

        var local_displacement_days = global_data[this.props.my_index].displacement_days;

        // Línea del principio
        // d3.select(this.refs.waveGroup).append("line")
        //     .style("stroke", "white").style("stroke-dasharray", ("3, 3"))
        //     .attr("y1", 0).attr("y2", 37)
        //     .attr("x1", graph_width)
        //     .attr("x2", graph_width);

        // Línea del final 
        // d3.select(this.refs.waveGroup).append("line")
        //     .style("stroke", "white").style("stroke-dasharray", ("3, 3"))
        //     .attr("y1", 0).attr("y2", 37)
        //     .attr("x1", 0)
        //     .attr("x2", 0);

        // Yearly lines 
        [...Array(10).keys()].forEach(iii => {
            d3.select(this.refs.waveGroup).append("line")
            .style("stroke", "white").style("stroke-dasharray", ("3, 3"))
            .attr("y1", 0).attr("y2", 37)
            .attr("x1", graph_width - days_width * 365 * iii)
            .attr("x2", graph_width - days_width * 365 * iii);
        });

        d3.select(this.refs.waveGroup)

            // Cabecera típica para seleccionar el elemento del svg
            .selectAll('path')
            .data(global_data[this.props.my_index].datos_1.reverse())
            .enter()
            .append("rect")

            // Contenido en sí
            .attr("x"      , function(d, i) { 
                return graph_width 
                // -days_width
                -i*(days_width) 
                -local_displacement_days*(days_width)
                ;
            })
            .attr("y"      , function(d, i) { return 0;  }  )
            .attr("width"  , function(d, i) { return days_width;  }  )
            .attr("height" , function(d, i) { return 37; }  )
            // .attr("full"   , function(d, i) { return "white"; }  )
            // .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/100) ) });
            .attr("fill"   , function(d, i) { return interpolate_color_function( 1-(d/100) ) });
    }

    render() {
        return (
            <div class="row_graph">
                <svg viewBox="0 0 2000 37" width="2000" height="37">
                    <g id="waveShape" ref="waveGroup"></g>
                </svg>
                {/* <div style={{backgroundColor: "red", width:"10px", height:"10px"}}></div> */}
            </div>
        );
    }

}

fetch('/indices')
    .then(function(response) { return response.json(); })
    .then(function(data)     { global_indices = data;  }
);


fetch('/datos')
    // .then(function(response) { return response.text(); })
    .then(function(response) { return response.json(); })
    .then(function(data)     {

        var children;

        global_data  = data;

        // To generate the names
        children = []
        for (var i = 0; i < data.length; i++) { children.push(<Row_name name={data[i].nombre} />); }
        ReactDOM.render( children, document.getElementById('panel_names') );

        // To generate the names
        children = [];
        for (var i = 0; i < data.length; i++) { children.push(<Row_graph my_index={i.toString()} />); }
        ReactDOM.render( children, document.getElementById('panel_histories') );

        // Para cosas de la interfaz
        assign_indexes();

        // Scroll lateral infinito
        document.getElementById("panel_histories").scrollLeft = 100000;

        // Update de cosas de ui de las cookies
        ui_update_variables();
});

// window.addEventListener('load', function () {
//     // alert("It's loaded!")
//     ui_update_variables();

//   })


// setTcimeout(())
// setTimeout(() => {
//     ui_update_variables();
// }, 1000);