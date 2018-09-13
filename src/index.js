import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from "./redux/store";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
