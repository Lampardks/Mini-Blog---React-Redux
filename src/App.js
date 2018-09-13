import React from "react";
import { Route } from "react-router-dom";
import { hot } from "react-hot-loader";
import Loadable from "react-loadable";
import { Loader } from "semantic-ui-react";

import TopNavigation from "./components/navigation/TopNavigation";

import "./App.css";

const Loading = () => <Loader active />;

const Home = Loadable({
  loader: () => import("./components/pages/HomePage/HomePage"),
  loading: Loading,
});

const Article = Loadable({
  loader: () => import("./components/pages/ArticlePage/ArticlePage"),
  loading: Loading,
});

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
