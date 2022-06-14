import axios from 'axios'


export const  W_LOGIN_SUCCESS = 'W_LOGIN_SUCCESS'
export const  W_LOGOUT_SUCCESS = 'W_LOGOUT_SUCCESS'
export const  W_LOGIN_FAIL = 'W_LOGIN_FAIL'

const urlbase = require('../config/url.config').address


export const  login = (usuario, password, idRest) => dispatch => {
    
   

    axios.get(urlbase + '/meseros/')
    .then( res => {

            let arr = res.data 

            let waiter = arr.filter(x=> x.nombre ===usuario & x.password === password && x.restaurantId === idRest)

            console.log(waiter)

            if (waiter.length > 0){
                dispatch({ 
                    type: W_LOGIN_SUCCESS,
                    payload: {
                        idRestaurant: idRest,
                        idWaiter: waiter[0].id,
                        nameWaiter: waiter[0].nombre_completo,
                    } 
                });
            }else{

                dispatch({ 
                    type: W_LOGIN_FAIL 
                });

            }

            
        })  
    .catch(err => { console.log("error message :" + err.message) })

}
  




export const logout = () => (dispatch, getstate) =>{
    dispatch({ type: W_LOGOUT_SUCCESS})
}


  