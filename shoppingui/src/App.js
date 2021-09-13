import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Product from "./components/Product";

import 'react-html5-camera-photo/build/css/index.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);



  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <h1>Manage Product Online</h1>
        </div>
      </nav>

      <div className="container mt-3">
        <Product></Product>
      </div>
    </div>
  );
};

export default App;
