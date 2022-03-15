import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

/*const express = require("express");
const app = express();
const cors = require("cors");
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );*/

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
