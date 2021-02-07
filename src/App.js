import './App.css';
import Store from './Store'
import CategorizedItem from './CategorizedItem'
import Cart from './Cart'
import SignUp from './SignUp'
import Login from './Login'
import Sidebar from './Sidebar'
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
 
  return (
      <React.Fragment>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
      <Router>
        <Switch>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Store} />
                <Route path="/filtereditem" exact component={CategorizedItem} />
                <Route path="/cart" exact component={Cart} />
        </Switch>
      </Router>
      </React.Fragment>
  );
}

export default App;