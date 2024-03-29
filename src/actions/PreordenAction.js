import axios from 'axios'
// import { tokenConfig } from './auth'

export const GET_PREORDENES = 'GET_PREORDENES';
export const GET_PREORDENES_RESTAURANT = 'GET_PREORDENES_RESTAURANT';
export const ADD_PREORDEN = 'ADD_PREORDEN';
export const EDIT_PREORDEN = 'EDIT_PREORDEN';
export const DELETE_PREORDEN ='DELETE_PREORDEN';



const urlbase = require('../config/url.config').address

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const  getPreordenes = () => (dispatch) => {
    axios.get(urlbase + '/preordenes/')
        .then( res => {
                dispatch({ 
                    type: GET_PREORDENES,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  


export const getPreordenesByRestaurant = (id) => (dispatch, getState)=>{
    axios.get(urlbase + `/preordenByRestaurant/${id}/`)
        .then( res => {
            dispatch({
                type: GET_PREORDENES_RESTAURANT,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};


export const addPreorden = (registro) => (dispatch) => {
    axios.post (urlbase + '/preordenes/', registro, config)
        .then(res=>{
            dispatch({
                type: ADD_PREORDEN,
                payload: res.data
            });            


        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editPreorden = ( registro, id) => (dispatch) => {
    axios.put(urlbase + `/preordenes/${id}/`, registro, config)
        .then( res => {
            dispatch({
                type: EDIT_PREORDEN,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deletePreorden = (id) => (dispatch)=>{
    axios.delete(urlbase + `/preordenes/${id}/`, config)
        .then( res => {
            dispatch({
                type: DELETE_PREORDEN,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};