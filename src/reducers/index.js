import { combineReducers } from 'redux'


import auth from './auth'
import restaurantes from './RestaurantReducer'


export default combineReducers({
    auth,
    restaurantes
    
})