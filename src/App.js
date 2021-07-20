import './Styles/Login.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home.js'
import Asteroids from './Components/Asteroids'
import AppContext from './Context/AppContext.js'
import NewUser from './Components/NewUser.js'
import UserPage from './Components/UserPage';
import { useState, useEffect } from 'react';

function App() {
  const [userVerified, setUserVerified] = useState(false)
  const [userName, setUserName] = useState([])
  const [previousScore, setPreviousScore] = useState(0)
  const [userHiScore, setUserHiScore] = useState(0)
  const [globalHiScore, setGlobalHiScore] = useState(0)
  const [globalHiPlayer, setGlobalHiPlayer] = useState('')
  const [deployLocal] = useState(false)
  const [fetchURL, setFetchURL] = useState('http://localhost:3001')

  if (deployLocal === false) {
    setFetchURL('https://nailuj843-final-backend.herokuapp.com')
  }

  useEffect(() => {
    fetch(`${fetchURL}/getHiScore`, {
      credentials: 'include',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8'
      }
    })
      .then(response => response.json())
      .then(result => {

        setGlobalHiScore(result.hiscore)
        setGlobalHiPlayer(result.username)
      })

  })

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <AppContext.Provider value={{
            userVerified, setUserVerified,
            userName, setUserName,
            previousScore, setPreviousScore,
            userHiScore, setUserHiScore,
            globalHiScore, setGlobalHiScore,
            globalHiPlayer, setGlobalHiPlayer,
            fetchURL
          }}>
            <Switch>
              <Route path='/' exact> <Home />  </Route>
              <Route path='/newUser' exact> <NewUser /> </Route>
              <Route path='/userPage' exact> <UserPage /> </Route>
              <Route path='/asteroids' exact> <Asteroids /> </Route>
            </Switch>

          </AppContext.Provider>
        </header>
      </div>
    </Router>
  );
}

export default App;
