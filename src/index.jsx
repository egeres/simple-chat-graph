import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';
// import chat_0  from '../chats/chat_0.json';



let global_data = null;

let graph_width = 6500;



class Contacts extends React.Component {

    componentDidMount() {
        if (this.props.my_index || (this.props.my_index === 0)) {
            var rect_width = 4;
            var extra_displacement = 700;
            // console.log(":");
            // console.log(d3.select(this.refs.waveGroup).node().getBBox());
            // console.log(d3.select(this.refs.waveGroup).node().getBoundingClientRect());
            let mini_global_data = global_data[this.props.my_index];

            // console.log( mini_global_data.displacement_days );
            // console.log("-------------");
            // console.log( global_data[this.props.my_index] );
            // console.log("-------------");

            d3.select(this.refs.waveGroup).selectAll('path')
                .data(global_data[this.props.my_index].datos_1.reverse())
                .enter().append("rect")
                .attr("x"      , function(d, i) { return graph_width -i*(rect_width) -rect_width -mini_global_data.displacement_days*(rect_width) -extra_displacement }  )
                .attr("y"      , function(d, i) { return 0 }  )
                .attr("width"  , function(d, i) { return (rect_width)       }  )
                .attr("height" , function(d, i) { return 120 }  )
                // .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/json_data["timeline_float_max"]) )     }  );
                .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/100) )     }  );
        }
    }

    render() {
        return (
            <svg viewBox="0 0 6500 30" width="6500" height="30">
                <g id="waveShape" ref="waveGroup">
                </g>
            </svg>
        );
    }

}

class App extends React.Component {

    constructor (props){
        super(props);
        this.state = {};
    }

    render() {
        return [
            (<div id="aaa" class="container_info">  </div>),
            (<div id="bbb" class="container_graphs"></div>)
        ];
    }

    componentDidMount() {}

}

let general_0 = ReactDOM.render( <App/>, document.getElementById('root') );

fetch('/datos')
    // .then(function(response) { return response.text(); })
    .then(function(response) { return response.json(); })
    .then(function(data)     {

        global_data  = data;

        // To generate the graphs themselves
        var children = [];
        for (var i = 0; i < data.length; i++) {
            children.push(<Contacts my_index={i} />);
        }
        ReactDOM.render( children, document.getElementById('bbb') );

        // To generate the names
        children = [];
        for (var i = 0; i < data.length; i++) {
            children.push(<div class="graph_title">{data[i].nombre}</div>)
        }
        ReactDOM.render( children, document.getElementById('aaa') );

        document.getElementById("bbb").scrollLeft = 100000;
    });
