import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_ORDENES = 'GET_ORDENES';
export const ADD_ORDEN = 'ADD_ORDEN';
export const EDIT_ORDEN = 'EDIT_ORDEN';
export const DELETE_ORDEN ='DELETE_ORDEN';



const urlbase ='http://my-rest-api.abcdatoz.net/api'
// const urlbase ='http://localhost:8000/api'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const  getOrdenes = () => (dispatch) => {
    axios.get(urlbase + '/ordenes/')
        .then( res => {
                dispatch({ 
                    type: GET_ORDENES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addOrden = (registro) => (dispatch) => {
    axios.post (urlbase + '/ordenes/', registro, config)
        .then(res=>{
            dispatch({
                type: ADD_ORDEN,
                payload: res.data
            });            


        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editOrden = ( registro, id) => (dispatch) => {
    axios.put(urlbase + `/ordenes/${id}/`, registro, config)
        .then( res => {
            dispatch({
                type: EDIT_ORDEN,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteOrden = (id) => (dispatch)=>{
    axios.delete(urlbase + `/ordenes/${id}/`, config)
        .then( res => {
            dispatch({
                type: DELETE_ORDEN,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};