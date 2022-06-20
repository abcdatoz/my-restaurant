import {GET_CATEGORIAS, GET_CATEGORIAS_RESTAURANT , ADD_CATEGORIA,EDIT_CATEGORIA,DELETE_CATEGORIA} from '../actions/CategoriaAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_CATEGORIAS:
            return {
                ...state,
                lista: action.payload
            };
        
        case GET_CATEGORIAS_RESTAURANT:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_CATEGORIA:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_CATEGORIA:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_CATEGORIA:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}