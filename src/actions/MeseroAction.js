import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_MESEROS = 'GET_MESEROS';
export const ADD_MESERO = 'ADD_MESERO';
export const EDIT_MESERO = 'EDIT_MESERO';
export const DELETE_MESERO ='DELETE_MESERO';

const urlbase = require('../config/url.config').address

export const  getMeseros = () => (dispatch, getState) => {
    axios.get(urlbase + '/meseros/')
        .then( res => {
                dispatch({ 
                    type: GET_MESEROS,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addMesero = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/meseros/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_MESERO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editMesero = ( registro, id) => (dispatch, getState) => {
    axios.put(urlbase + `/meseros/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_MESERO,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteMesero = (id) => (dispatch, getState)=>{
    axios.delete(urlbase + `/meseros/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_MESERO,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};