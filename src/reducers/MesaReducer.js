import {GET_MESAS,ADD_MESA,EDIT_MESA,DELETE_MESA} from '../actions/MesaAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_MESAS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_MESA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_MESA:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_MESA:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}