import axios from 'axios'
import { tokenConfig } from './auth'

export const GET_RESTAURANTS = 'GET_RESTAURANTS';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';
export const EDIT_RESTAURANT = 'EDIT_RESTAURANT';
export const DELETE_RESTAURANT ='DELETE_RESTAURANT';

const urlbase ='http://my-rest-api.abcdatoz.net/api'

export const  getRestaurants = () => (dispatch, getState) => {
    axios.get(urlbase + '/restaurants/')
        .then( res => {
                dispatch({ 
                    type: GET_RESTAURANTS                    ,
                    payload: res.data 
                });
            })
        .catch(err => { console.log("error message :" + err.message) })
};  

export const addRestaurant = (registro) => (dispatch, getState) => {
    axios.post (urlbase + '/restaurants/', registro, tokenConfig(getState))
        .then(res=>{
            dispatch({
                type: ADD_RESTAURANT,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const editRestaurant = ( registro, id) => (dispatch, getState) => {
    axios.put(urlbase + `/restaurants/${id}/`, registro, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: EDIT_RESTAURANT,
                payload: res.data
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};

export const deleteRestaurant = (id) => (dispatch, getState)=>{
    axios.delete(urlbase + `/restaurants/${id}/`, tokenConfig(getState))
        .then( res => {
            dispatch({
                type: DELETE_RESTAURANT,
                payload: id
            });            
        })
        .catch(err => { console.log("error message :" + err.message) })
};