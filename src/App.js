import './App.css';
import Store from './Store'
import Cart from './Cart'
import SignUp from './SignUp'
import Login from './Login'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
  return (
      <Router>
        <Switch>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Store} />
                <Route path="/cart/" exact component={Cart} />
        </Switch>
      </Router>
  );
}

export default App;