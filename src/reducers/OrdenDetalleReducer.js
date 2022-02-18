import {GET_ORDENES_DETALLES,ADD_ORDEN_DETALLE,EDIT_ORDEN_DETALLE,DELETE_ORDEN_DETALLE} from '../actions/OrdenDetalleAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_ORDENES_DETALLES:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_ORDEN_DETALLE:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_ORDEN_DETALLE:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_ORDEN_DETALLE:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}