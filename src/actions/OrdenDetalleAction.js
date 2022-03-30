import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_ORDENES_DETALLES = 'GET_ORDENES_DETALLES';
export const ADD_ORDEN_DETALLE = 'ADD_ORDEN_DETALLE';
export const EDIT_ORDEN_DETALLE = 'EDIT_ORDEN_DETALLE';
export const DELETE_ORDEN_DETALLE ='DELETE_ORDEN_DETALLE';

// const urlbase ='http://my-rest-api.abcdatoz.net/api'
const urlbase ='http://localhost:8000/api'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const  getOrdenesDetalles = () => (dispatch) => {
    axios.get(urlbase + '/ordenesDetalle/')
        .then( res => {
                dispatch({ 
                    type: GET_ORDENES_DETALLES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addOrdenDetalle = (registro) => (dispatch) => {
    axios.post (urlbase + '/ordenesDetalle/', registro,config)
        .then(res=>{
            dispatch({
                type: ADD_ORDEN_DETALLE,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editOrdenDetalle = ( registro, id) => (dispatch) => {
    axios.put(urlbase + `/ordenesDetalle/${id}/`, registro,config)
        .then( res => {
            dispatch({
                type: EDIT_ORDEN_DETALLE,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteOrdenDetalle = (id) => (dispatch)=>{
    axios.delete(urlbase + `/ordenesDetalle/${id}/`, config)
        .then( res => {
            dispatch({
                type: DELETE_ORDEN_DETALLE,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};