import './Styles/Login.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home.js'
import Asteroids from './Components/Asteroids'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <Switch>
            <Route path='/' exact> <Home />  </Route>
            <Route path='/asteroids' exact> <Asteroids /> </Route>
            {/* <Route path='/profiles' exact> <Profiles /> </Route> */}

          </Switch>


        </header>
      </div>
    </Router>
  );
}

export default App;
