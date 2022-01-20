import { combineReducers } from 'redux'


import auth from './auth'
import restaurantes from './RestaurantReducer'
import categorias from './CategoriaReducer'
import productos from './ProductoReducer'
import productosImagenes from './ProductoImagenReducer'

import meseros from './MeseroReducer'

export default combineReducers({
    auth,
    restaurantes,
    categorias,
    productos,
    productosImagenes, 
    meseros
    
})