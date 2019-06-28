import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';
import chat_0  from '../chats/chat_0.json';



let global_data = null;




function Chat_graph() {
    return <svg viewBox="0 0 500 30" width="500" height="30"></svg>;
}


class Contacts extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        data: 'Jordan Belfort'
      }
    }

    componentDidMount() {

        if (this.props.my_index || (this.props.my_index === 0)) {

            var rect_width = 4;

            d3.select(this.refs.waveGroup).selectAll('path')
                .data(global_data[this.props.my_index].datos_1)
                .enter().append("rect")
                .attr("x"      , function(d, i) { return i*(rect_width) }  )
                .attr("y"      , function(d, i) { return 0 }  )
                .attr("width"  , function(d, i) { return (rect_width)       }  )
                .attr("height" , function(d, i) { return 120 }  )
                // .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/json_data["timeline_float_max"]) )     }  );
                .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/50) )     }  );

        }

    }

    render() {
        return (
            <svg viewBox="0 0 500 30" width="500" height="30">
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

    });








// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
//
// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );




// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }
//
// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );








// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }
//
// setInterval(tick, 1000);




// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('root')
// );

// ReactDOM.render(<App/>, document.getElementById('root'));



// document.addEventListener("DOMContentLoaded", function(event) {
//   const element = document.createElement('h1')
//   element.innerHTML = "Hello World"
//   document.body.appendChild(element)
// })

//
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {this.props.value}
//       </button>
//     );
//   }
// }
//
// React.render(
//   <App mailboxes={fixtures} />,
//   document.body
// );
