import './App.css';
import Store from './Store'
import CategorizedItem from './CategorizedItem'
import Cart from './Cart'
import SignUp from './SignUp'
import Login from './Login'
import Sidebar from './Sidebar'
import Checkout from './Checkout'
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios';
import BaseURL from './Constants';
import {Provider} from 'react-redux'
import store from './reduxstore'


function App() {

  //below function calls the API endpoint every 50 minutes to prevent the free dyno from going to sleep on heroku.
  setInterval(() => {
    axios.get(BaseURL)
  }, 3000000);

  return (
      <Provider store={store}>
        <React.Fragment>
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
        <Router>
          <Switch>
                  <Route path="/signup" exact component={SignUp} />
                  <Route path="/login" exact component={Login} />
                  <Route path="/" exact component={Store} />
                  <Route path="/filtereditem" exact component={CategorizedItem} />
                  <Route path="/cart" exact component={Cart} />
                  <Route path="/checkout" exact component={Checkout} />
          </Switch>
        </Router>
        </React.Fragment>
      </Provider>
  );
}

export default App;