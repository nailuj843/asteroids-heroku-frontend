import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../Context/AppContext";

function ProtectedRoute({ component: Component, ...restOfProps }) {
    const { userVerified } = useContext(AppContext)
    console.log("userVerifed: ", userVerified);

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                userVerified ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;