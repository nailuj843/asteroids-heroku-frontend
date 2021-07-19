import { Link } from "react-router-dom"
import '../Styles/Home.css';
import { useContext } from "react";
import AppContext from "../Context/AppContext";
import { useHistory } from "react-router-dom";

const Home = () => {
    const { userVerified, setUserVerified } = useContext(AppContext)
    const history = useHistory()

    var id = window.setTimeout(function () { }, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    const handleLogin = (e) => {
        console.log('User clicked login')
        console.log(`username: ${document.getElementById('username').value}`)
        console.log(`password: ${document.getElementById('password').value}`)

        let bodyObject = { 'username': document.getElementById('username').value, 'password': document.getElementById('password').value }


        fetch(`https://nailuj843-final-backend.herokuapp.com/login`, {
            credentials: 'include',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'charset': 'UTF-8'
            },
            body: JSON.stringify(bodyObject)
        })
            .then(response => {
                console.log(response.status)
                if (response.status === 204) {

                }

                if (response.status === 401) {

                }

                if (response.status === 200) {
                    setUserVerified(true)
                    history.push('/asteroids')
                }
            })


    }

    return (
        <div className='columnLayout'>
            <div className='inputWLabel'>
                <input className='homeInput' id='username'></input>
                userName

            </div>
            <br />
            <div className='inputWLabel'>
                <input className='homeInput' id='password'></input>
                passWord

            </div>
            <br />

            <div>
                <Link to='/asteroids'
                    style={{ textDecoration: 'none' }}>
                    <button className='homeButton' onClick={handleLogin}>
                        Login
                    </button>
                </Link>

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