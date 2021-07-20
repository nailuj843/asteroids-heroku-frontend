import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context/AppContext";

function NewUser() {
    const history = useHistory()
    const { fetchURL } = useContext(AppContext)

    const createNewUser = () => {

        let passWord = document.getElementById('password').value
        let passWordVerification = document.getElementById('passwordVerification').value
        let userName = document.getElementById('username').value

        if (passWord === '' || passWordVerification === '' || userName === '') {
            alert('userName or passWord cannot be blank')
            return
        }

        if (passWordVerification !== passWord) {
            alert('passWords do not match')
            return
        }

        let bodyObject = { "password": passWord, "username": userName }

        fetch(`${fetchURL}/newUser`, {
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
                if (result.message === 'User Already Exists') {
                    alert('User already exists')
                } else {
                    alert('User Created, Please Login')
                    history.push('/')
                }
            })
    }

    const handleKeyPressOnPassword = (e) => {
        if (e.key === 'Enter') {
            createNewUser()
        }
    }

    return (
        <div className='columnLayout'>
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

            <div className='inputWLabel'>
                <input className='homeInput' id='passwordVerification' type='password' onKeyDown={handleKeyPressOnPassword}></input>
                verify passWord

            </div>

            <br />

            <div>
                <button className='homeButton' onClick={createNewUser} >
                    Create User
                </button>

                <Link to='/' style={{ textDecoration: 'none' }}>
                    <button className='homeButton'>
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default NewUser