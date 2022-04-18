import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_MESAS = 'GET_MESAS';
export const ADD_MESA = 'ADD_MESA';
export const EDIT_MESA = 'EDIT_MESA';
export const DELETE_MESA ='DELETE_MESA';

const urlbase ='http://my-rest-api.abcdatoz.net/api'
// const urlbase ='http://localhost:8000/api'

export const  getMesas = () => (dispatch) => {
    axios.get(urlbase + '/mesas/')
        .then( res => {
                dispatch({ 
                    type: GET_MESAS,
                    payload: res.data 
                });
            })  
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addMesa = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/mesas/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_MESA,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editMesa = ( registro, id) => (dispatch, getState) => {
    axios.put(urlbase + `/mesas/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_MESA,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteMesa = (id) => (dispatch, getState)=>{
    axios.delete(urlbase + `/mesas/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_MESA,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};