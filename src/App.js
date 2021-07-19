import './Styles/Login.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home.js'
import Asteroids from './Components/Asteroids'
import AppContext from './Context/AppContext.js'
import ProtectedRoute from './Components/ProtectedRoute';
import NewUser from './Components/NewUser.js'
import { useState, useEffect } from 'react';

function App() {
  const [userVerified, setUserVerified] = useState(false)

  useEffect(() => {
    console.log(userVerified)
  })

  return (


    <Router>
      <div className="App">
        <header className="App-header">
          <AppContext.Provider value={{ userVerified, setUserVerified }}>
            <Switch>
              <Route path='/' exact> <Home />  </Route>
              <ProtectedRoute path='/asteroids' exact component={Asteroids} ></ProtectedRoute>
              {/* <Route path='/asteroids' exact> <Asteroids /> </Route> */}
              <Route path='/newUser' exact> <NewUser /> </Route>

            </Switch>

          </AppContext.Provider>
        </header>
      </div>
    </Router>
  );
}

export default App;
