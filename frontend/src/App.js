import React from "react";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Items from "./pages/Items";

function App(){

  const path = window.location.pathname;

  if(path === "/login"){
    return (
      <div className="page">
        <Login/>
      </div>
    );
  }

  if(path === "/items"){
    return <Items/>;
  }

  return (
    <div className="page">
      <Register/>
    </div>
  );

}

export default App;