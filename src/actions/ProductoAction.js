import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_PRODUCTOS = 'GET_PRODUCTOS';
export const GET_PRODUCTOS_RESTAURANT = 'GET_PRODUCTOS_RESTAURANT';
export const ADD_PRODUCTO = 'ADD_PRODUCTO';
export const EDIT_PRODUCTO = 'EDIT_PRODUCTO';
export const DELETE_PRODUCTO ='DELETE_PRODUCTO';

const urlbase = require('../config/url.config').address

export const  getProductos = () => (dispatch, getState) => {
    axios.get(urlbase + '/productos/')
        .then( res => {
                dispatch({ 
                    type: GET_PRODUCTOS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  


export const getProductoByRestaurant = (id) => (dispatch, getState)=>{
    axios.get(urlbase + `/productosRestaurant/${id}/`)
        .then( res => {
            dispatch({
                type: GET_PRODUCTOS_RESTAURANT,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const addProducto = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/productos/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_PRODUCTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editProducto = ( registro, id) => (dispatch, getState) => {
    axios.put(urlbase + `/productos/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_PRODUCTO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteProducto = (id) => (dispatch, getState)=>{
    axios.delete(urlbase + `/productos/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_PRODUCTO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};