
import React from 'react';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Route exact path="/" component={Home}/>
    <Switch>
        <Route path="/dashboard/" component={Dashboard}/>
    </Switch>
    
    </div>
  );
}

export default App;
