import {GET_ORDENES_DETALLES} from '../actions/PreordenDetalleAction'

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
        
        

        default:{
            return state;
        }
            
    }
}