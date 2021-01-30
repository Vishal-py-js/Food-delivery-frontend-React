import './App.css';
import Store from './Store'
import Cart from './Cart'
import Login from './Login'


function App() {
  return (
      <Router>
        <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={Store} />
                <Route path="/cart/" exact component={Cart} />
        </Switch>
      </Router>
  );
}

export default App;