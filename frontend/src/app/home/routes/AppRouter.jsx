import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../../../shared/components/Header';
import Home from '../pages/Home';
import InHigh from '../pages/InHigh';
import MostListened from '../pages/MostListened';
import Edition from '../pages/Edition';

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/in-high" component={InHigh} />
        <Route path="/most-listened" component={MostListened} />
        <Route path="/edition" component={Edition} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

