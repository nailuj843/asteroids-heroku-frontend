import { Link } from "react-router-dom";

function NewUser() {
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
                {/* <Link to='/asteroids'
                    style={{ textDecoration: 'none' }}>
                    <button className='homeButton' >
                        Login
                    </button>
                </Link> */}

                <Link to='/newUser'>
                    <button className='homeButton' >
                        New User
                    </button>
                </Link>


                <Link to='/' style={{ textDecoration: 'none' }}><button
                    style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>Home</button></Link>


            </div>

        </div>


    )
}

export default NewUser