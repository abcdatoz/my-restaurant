import axios from 'axios'

export const GET_ORDENES_DETALLES = 'GET_ORDENES_DETALLES';



const urlbase = require('../config/url.config').address

// const config = {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

export const  getPreordenesDetalles = () => (dispatch) => {
    axios.get(urlbase + '/preordenesDetalle/')
        .then( res => {
                dispatch({ 
                    type: GET_ORDENES_DETALLES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  
