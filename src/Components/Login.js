// import { TextField, Button } from '@material-ui/core';
// import React, { useContext, useEffect } from 'react';
// import AppContext from '../contexts/AppContext';
import { Link } from "react-router-dom";

function Login() {
    return (
        <div>
            <Link to='/asteroids' style={{ textDecoration: 'none' }}><button
                style={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}>Login</button></Link>
        </div>
    )
}

export default Login