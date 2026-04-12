import React from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Items from "./pages/Items";

function App(){

  const currentPath = window.location.pathname;

  if(currentPath === "/items"){
    return <Items />;
  }

  return(

    <div className="page">

      <Register />

      <hr />

      <Login />

    </div>

  );

}

export default App;