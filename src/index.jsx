import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';






function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);




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
