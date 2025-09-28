import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Suspense fallback="loading...">
        <Routes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
