//  import { connect } from 'react-redux'
import React   from 'react'
import {useSelector} from 'react-redux'
import {Navigate } from 'react-router-dom'


 

const PrivateRoute = ({ children }) =>{
    
    //use selectors
    const {isAuthenticated, user} = useSelector( store => store.auth);


    return isAuthenticated ? children : <Navigate to="/login" />;

}

export default PrivateRoute;



// const PrivateRoute = ({component: Component, auth, ...rest}) => (
//     <Route
//         {...rest}

//         render={props => {
//             if (auth.isLoading){

//                 return <h2>Loading...</h2>

//             }else if (!auth.isAuthenticated){

//                 return <Navigate to ='/login' />

//             }else{

//                 return <Component {...props} />

//             }
//         }}
//     />
// )


// const mapState =state => ({
//     auth: state.auth
// })

// export default connect(mapState)(PrivateRoute);