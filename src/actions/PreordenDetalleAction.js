import axios from 'axios'

export const GET_ORDENES_DETALLES = 'GET_ORDENES_DETALLES';



const urlbase ='http://my-rest-api.abcdatoz.net/api'
// const urlbase ='http://localhost:8000/api'

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
