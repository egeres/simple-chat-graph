import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

import * as d3 from 'd3';


import chat_0 from '../chats/chat_0.json';


console.log( chat_0 );
console.log( chat_0[0].chat_messages_1 );


function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// function base_svg() {
//     return <svg viewBox="0 0 1500 30" width="1500" height="30"></svg>;
// }

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
        // console.log("---");
        console.log(this.props);

        // d3.select(this.refs.waveGroup).append("circle")
        //     .attr("fill",  "red")
        //     .attr("cx", 30)
        //     .attr("cy", 30)
        //     .attr("r", 20);

        var rect_width = 4;

        d3.select(this.refs.waveGroup).selectAll('path')
        // .data(json_data["data"])
          // .data([0, 20, 0,0,0,0,0,50,12])
          // .data(chat_0[0].chat_messages_1)
          .data(chat_0[0].chat_messages_1)
          .enter().append("rect")
          .attr("x"      , function(d, i) { return i*(rect_width) }  )
          .attr("y"      , function(d, i) { return 0 }  )
          .attr("width"  , function(d, i) { return (rect_width)       }  )
          .attr("height" , function(d, i) { return 120 }  )
          // .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/json_data["timeline_float_max"]) )     }  );
          .attr("fill"   , function(d, i) { return d3.interpolateYlOrRd( 1-(d/50) )     }  );
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


// function App() {
//     return [
//         (<div id="aaa" class="container_info">
//             <div class="graph_title">Nanai</div>
//             <div class="graph_title">Nanai</div>
//             <div class="graph_title">Nanai</div>
//         </div>),
//
//         (<div id="bbb" class="container_graphs">
//             /* <div class="container_row_graph"> */
//             /*     <Chat_graph/> */
//             /* </div> */
//             /* <div class="container_row_graph"> */
//             /*     <Chat_graph/> */
//             /* </div> */
//             /* <div class="container_row_graph"> */
//             /*     <Chat_graph/> */
//             /* </div> */
//         </div>)
//     ];
// }

var global_data = null;

class App extends React.Component {
// let App = React.createClass({

  // createImage: function (image) {
  //   return <Image source={image} key={image} />;
  // },

  // createImages: function (images) {
  //   return images.map(this.createImage);
  // },


    create_graph_i(my_index) {
        return <Contacts my_index={my_index}/>;
    }

    // create_graph(file_individual) {
    //     return <Contacts file={file_individual}/>;
    // }

    // create_graphs(files)
    // {
    //     return files.map(this.create_graph);
    // }

    render() {
        return [
            (<div id="aaa" class="container_info">
                <div class="graph_title">Nanai</div>
                <div class="graph_title">Nanai</div>
                <div class="graph_title">Nanai</div>
            </div>),

            (<div id="bbb" class="container_graphs">
                // {this.create_graphs(["graph_0", "graph_1", "graph_2"])}
            </div>)
        ];
    }


    componentDidMount() {

        // fetch('localhost:3001', {method:'post'}) // <-- this path surprises me
        //   .then(response => function() { console.log(response); })

        fetch('/datos')
        .then(function(response) { return response.text(); })
        .then(function(data)     {
            console.log('data = ', data);
            global_data = data;
            // data.map(this.create_graph);
            for (var i = 0; i < data.length; i++) {
                // array[i]
                this.create_graph_i(i);
            }

        });


    }

}



let general_0 = ReactDOM.render( <App/>, document.getElementById('root') );
// var contenido_generado_a = ReactDOM.render( <Contacts file="chat_0"/>, document.getElementById('bbb') );
// var contenido_generado_b = ReactDOM.render( <Contacts file="chat_1"/>, document.getElementById('bbb') );
// var contenido_generado_c = ReactDOM.render( <Contacts file="chat_2"/>, document.getElementById('bbb') );

// console.log(contenido_generado);



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
