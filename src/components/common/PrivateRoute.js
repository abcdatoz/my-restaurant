//  import { connect } from 'react-redux'
import React   from 'react'
import {useSelector} from 'react-redux'
import {Navigate } from 'react-router-dom'

 

const PrivateRoute = ({ children }) =>{
    
    //use selectors
    const {isAuthenticated} = useSelector( store => store.auth);


    return isAuthenticated ? children : <Navigate to="/Administracion" />;

}

export default PrivateRoute;

