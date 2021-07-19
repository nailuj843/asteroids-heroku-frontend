import { Link } from "react-router-dom"
import '../Styles/Home.css';

const Home = () => {

    var id = window.setTimeout(function () { }, 0);

    while (id--) {
        window.clearTimeout(id); // will do nothing if no timeout with id is present
    }

    const handleLogin = (e) => {
        
    }

    return (
        <div className='columnLayout'>
            <div className='inputWLabel'>
                <input className='homeInput'></input>
                userName

            </div>
            <br />
            <div className='inputWLabel'>
                <input className='homeInput'></input>
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

                {/* 
                <Link to='/register'
                    style={{ textDecoration: 'none' }}>
                    <button className='homeButton'>
                        Register New User
                    </button>
                </Link> 
                */}

            </div>

        </div>
    )

}

export default Home