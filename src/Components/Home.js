import { Link } from "react-router-dom"
import '../Styles/Home.css';
import { useContext } from "react";
import AppContext from "../Context/AppContext";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { setUserVerified } = useContext(AppContext)
    const { setUserName } = useContext(AppContext)
    const { setUserHiScore } = useContext(AppContext)
    const { globalHiScore, globalHiPlayer } = useContext(AppContext)
    const { fetchURL } = useContext(AppContext)
    const history = useHistory()

    var id = window.setTimeout(function () { }, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    const handleLogin = (e) => {
        let userName = document.getElementById('username').value
        let passWord = document.getElementById('password').value

        if (userName === '' || passWord === '') {
            alert(`userName or passWord cannot be blank`)
            return
        }

        let bodyObject = { 'username': userName, 'password': passWord }

        fetch(`${fetchURL}/login`, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify(bodyObject)
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.message === 'create new user') {
                    // create new user
                    alert('User Not Found, Please Create New User')
                    history.push('/newUser')
                }

                if (result.message === 'incorrect password') {
                    // incorrect password
                    alert('Username Found: Incorrect Password')
                }

                if (result.message === 'login successful') {
                    // login successful
                    setUserVerified(true)
                    setUserName(userName)
                    setUserHiScore(result.hiscore)
                    history.push('/userPage')
                }
            })
    }

    const handleKeyPressOnPassword = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className='columnLayout'>
            <h1> Welcome to CSSteroids </h1>
            <h1> Current Hi Score: {globalHiScore} </h1>
            <h1> Set By: {globalHiPlayer} </h1>
            <br /><br />
            <div className='inputWLabel'>
                <input className='homeInput' id='username'></input>
                userName

            </div>
            <br />
            <div className='inputWLabel'>
                <input className='homeInput' id='password' type='password' onKeyDown={handleKeyPressOnPassword}></input>
                passWord

            </div>
            <br />

            <div>
                <button className='homeButton' onClick={handleLogin}>
                    Login
                </button>

                <Link to='/newUser'>
                    <button className='homeButton' >
                        New User
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home