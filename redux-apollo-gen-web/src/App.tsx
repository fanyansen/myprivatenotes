import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
