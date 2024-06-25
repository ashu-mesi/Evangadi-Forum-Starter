import React from "react";
import App from "./App.jsx";
// import ReactDOM from "react-dom";
// import react route
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";

// ReactDOM.render(
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);




// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// import {BrowserRouter} from 'react-router-dom'


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>

//     <App />
//     </BrowserRouter>

//   </React.StrictMode>
// );