import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';
// import chat_0  from '../chats/chat_0.json';
import Cookies from 'js-cookie';

console.log("loading the new index");
let global_data = null;
let graph_width = 1000;
let days_width  = 4;
let interpolate_color_function = d3.interpolateYlOrRd;

if (Cookies.get('days_width')) { days_width = Cookies.get('days_width'); console.log('current days withd is', days_width); }

// Cookies.get('contenedor_instancias_columns');
// if (!Cookies.get('theme') || Cookies.get('theme') == "dark")
// Cookies.set('theme', 'clear');

function ui_update_variables(params) {
    document.getElementById("value_days_width").innerHTML = Cookies.get('days_width').toString();
}

function ui_property_days_width_increase() {
    console.log("Incresaing...");
    
    if      (days_width == 1 ) { days_width = 2 ; Cookies.set('days_width', days_width); }
    else if (days_width == 2 ) { days_width = 4 ; Cookies.set('days_width', days_width); }
    else if (days_width == 4 ) { days_width = 8 ; Cookies.set('days_width', days_width); }
    else if (days_width == 8 ) { days_width = 24; Cookies.set('days_width', days_width); }
    else if (days_width == 24) { days_width = 30; Cookies.set('days_width', days_width); }

    ui_update_variables();
}

function ui_property_days_width_decrease() {
    console.log("Decreasing...");

    if      (days_width == 2 ) { days_width = 1 ; Cookies.set('days_width', days_width); }
    else if (days_width == 4 ) { days_width = 2 ; Cookies.set('days_width', days_width); }
    else if (days_width == 8 ) { days_width = 4 ; Cookies.set('days_width', days_width); }
    else if (days_width == 24) { days_width = 8 ; Cookies.set('days_width', days_width); }
    else if (days_width == 30) { days_width = 24; Cookies.set('days_width', days_width); }
    
    ui_update_variables();
}

function update_chats() {
    fetch('/update_chats', {method:'post'})
}


// Hacky, needs to be removed !
window.ui_property_days_width_increase = ui_property_days_width_increase;
window.ui_property_days_width_decrease = ui_property_days_width_decrease;
window.ui_update_variables             = ui_update_variables;
window.update_chats                    = update_chats;

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

        console.log('mounting...');
        console.log(this.props.my_index);
        console.log(global_data[this.props.my_index].datos_1);

        var local_displacement_days = global_data[this.props.my_index].displacement_days;
        
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
                <svg viewBox="0 0 1000 37" width="1000" height="37">
                    <g id="waveShape" ref="waveGroup"></g>
                </svg>
                {/* <div style={{backgroundColor: "red", width:"10px", height:"10px"}}></div> */}
            </div>
        );
    }

}

fetch('/datos')
    // .then(function(response) { return response.text(); })
    .then(function(response) { return response.json(); })
    .then(function(data)     {

        global_data  = data;

        // To generate the names
        var children = [];
        for (var i = 0; i < data.length; i++) {
            children.push(<Row_name name={data[i].nombre} />);
        }
        ReactDOM.render( children, document.getElementById('panel_names') );

        // To generate the names
        var children = [];
        for (var i = 0; i < data.length; i++) {
            children.push(<Row_graph my_index={i.toString()} />);
        }
        ReactDOM.render( children, document.getElementById('panel_histories') );

        assign_indexes();

        eva.replace({fill:"#fff"})
                
        document.getElementById("panel_histories").scrollLeft = 100000;

        ui_update_variables();

});