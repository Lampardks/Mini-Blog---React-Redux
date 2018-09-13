import React from "react";
import { Route } from "react-router-dom";
import { hot } from "react-hot-loader";

import Home from "./components/pages/HomePage/HomePage";
import Article from "./components/pages/ArticlePage/ArticlePage";
import TopNavigation from "./components/navigation/TopNavigation";

import "./App.css";

const App = () => {
  return (
    <div className="ui container">
      <TopNavigation />
      <Route path="/" exact component={Home} />
      <Route path="/article/:id" exact component={Article} />
    </div>
  );
};

export default hot(module)(App);
