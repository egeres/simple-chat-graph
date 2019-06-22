import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';






function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// function base_svg() {
//     return <svg viewBox="0 0 1500 30" width="1500" height="30"></svg>;
// }

function Chat_graph() {
    return <svg viewBox="0 0 1500 30" width="1500" height="30"></svg>;
}


class Contacts extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        data: 'Jordan Belfort'
      }
    }

    componentDidMount() {
         d3.select(this.refs.waveGroup).append("circle")
                        .attr("fill",  "red")
                        .attr("cx", 30)
                        .attr("cy", 30)
                        .attr("r", 20);
    }

    render() {
        return (
            <svg viewBox="0 0 1500 30" width="1500" height="30">
                <g id="waveShape" ref="waveGroup">
                </g>
            </svg>
        );
    }

}

// var Chat_graph = React.createClass({
//     render: function() {
//         return (
//             <svg viewBox="0 0 1500 30" width="1500" height="30"></svg>
//         );
//     }
// });

// var Hello = React.createClass({
//     render: function() {
//         return <div>Hello {this.props.name}</div>;
//     }
// });


function App() {
    return [
        (<div id="aaa" class="container_info">
            <div class="graph_title">Nanai</div>
            <div class="graph_title">Nanai</div>
            <div class="graph_title">Nanai</div>
        </div>),

        (<div id="bbb" class="container_graphs">
            /* <div class="container_row_graph"> */
            /*     <Chat_graph/> */
            /* </div> */
            /* <div class="container_row_graph"> */
            /*     <Chat_graph/> */
            /* </div> */
            /* <div class="container_row_graph"> */
            /*     <Chat_graph/> */
            /* </div> */
        </div>)
    ];
}

ReactDOM.render( <App />, document.getElementById('root') );
var contenido_generado = ReactDOM.render( <Contacts/>, document.getElementById('bbb') );

console.log(contenido_generado);



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
