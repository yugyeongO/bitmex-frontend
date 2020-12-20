
import React from 'react';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import {
  Provider,
} from './context/DashboardContext';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Provider>
      <Route path="/" exact component={Home}/>
      <Switch>
          <Route path="/dashboard/" component={Dashboard}/>
      </Switch>
    </Provider>
  );
}

export default App;
