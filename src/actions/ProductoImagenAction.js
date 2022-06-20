import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_PRODUCTOIMAGENES = 'GET_PRODUCTOIMAGENES';
export const GET_PRODUCTOIMAGENES_RESTAURANT = 'GET_PRODUCTOIMAGENES_RESTAURANT';
export const ADD_PRODUCTOIMAGEN = 'ADD_PRODUCTOIMAGEN';
export const EDIT_PRODUCTOIMAGEN = 'EDIT_PRODUCTOIMAGEN';
export const DELETE_PRODUCTOIMAGEN ='DELETE_PRODUCTOIMAGEN';

const urlbase = require('../config/url.config').address

export const  getProductoImagenes = () => (dispatch, getState) => {
    axios.get(urlbase + '/productoImagenes/')
        .then( res => {
                dispatch({ 
                    type: GET_PRODUCTOIMAGENES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  


export const getProductoImagenesByRestaurant = (id) => (dispatch, getState)=>{
    axios.get(urlbase + `/productoImagenesByRestaurant/${id}/`)
        .then( res => {
            dispatch({
                type: GET_PRODUCTOIMAGENES_RESTAURANT,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const addProductoImagen = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/productoImagenes/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_PRODUCTOIMAGEN,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editProductoImagen = ( registro, id) => (dispatch, getState) => {
    axios.put(urlbase + `/productoImagenes/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_PRODUCTOIMAGEN,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteProductoImagen = (id) => (dispatch, getState)=>{
    axios.delete(urlbase + `/productoImagenes/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_PRODUCTOIMAGEN,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};