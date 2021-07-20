import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { useHistory } from "react-router-dom";

function UserPage() {
    const { userName } = useContext(AppContext)
    const { userVerified, setUserVerified } = useContext(AppContext)
    const { previousScore, userHiScore, globalHiScore, globalHiPlayer } = useContext(AppContext)
    const { fetchURL } = useContext(AppContext)
    const history = useHistory()

    if (userVerified === false) {
        history.push('/')
    }

    const deleteAccount = () => {
        fetch(`${fetchURL}/delete`, {
            credentials: 'include',
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify({ 'username': userName })
        })
            .then(response => response.json())
            .then(result => {
                alert(`${userName} has been deleted, you will now be logged out`)
                logout()
            })
    }

    const logout = () => {
        setUserVerified(false)
    }

    const playAsteroids = () => {
        history.push('/asteroids')
    }

    useEffect(() => {
        var id = window.setTimeout(function () { }, 0);

        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }
    })

    return (
        <div className='columnLayout'>
            <div className='inputWLabel'> Welcome, {userName} </div> <br />
            <div className='inputWLabel'> Previous Play Score: {previousScore} </div>
            <div className='inputWLabel'> Hi Score: {userHiScore} </div> <br />
            <div className='inputWLabel'> Global Hi Score: {globalHiScore} </div>
            <div className='inputWLabel'> Set By: {globalHiPlayer} </div>

            <br />

            <button className='homeButton' onClick={playAsteroids} >
                Play Asteroids
            </button>

            <Link to='/' style={{ textDecoration: 'none' }}>
                <button className='homeButton' onClick={logout}>
                    Logout
                </button>
            </Link>

            <br /><br /><br />

            <button className='homeButton' onClick={deleteAccount}>
                Delete Account
            </button>
        </div>
    )
}

export default UserPage