import { combineReducers } from 'redux'


import auth from './auth'
import restaurantes from './RestaurantReducer'
import categorias from './CategoriaReducer'
import productos from './ProductoReducer'
import productosImagenes from './ProductoImagenReducer'


export default combineReducers({
    auth,
    restaurantes,
    categorias,
    productos,
    productosImagenes
    
})