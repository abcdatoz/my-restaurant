import { combineReducers } from 'redux'

import auth from './auth'
import authWaiter from './authWaiters'
import restaurantes from './RestaurantReducer'
import categorias from './CategoriaReducer'
import productos from './ProductoReducer'
import productoImagenes from './ProductoImagenReducer'

import mesas from './MesaReducer'
import meseros from './MeseroReducer'

import ordenes from './OrdenReducer'
import ordenesDetalles from './OrdenDetalleReducer'

export default combineReducers({
    auth,
    authWaiter,
    restaurantes,
    categorias,
    productos,
    productoImagenes,
    mesas, 
    meseros,
    ordenes,
    ordenesDetalles
    
})