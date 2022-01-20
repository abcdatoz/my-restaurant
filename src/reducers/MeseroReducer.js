import {GET_MESEROS,ADD_MESERO,EDIT_MESERO,DELETE_MESERO} from '../actions/MeseroActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_MESEROS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_MESERO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_MESERO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_MESERO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}