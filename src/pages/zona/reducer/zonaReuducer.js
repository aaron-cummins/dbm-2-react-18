import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS} from '../../../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA:
            return {
                ...state,
                zonaList: action.payload
            };
        case REGISTRAR:
            return {
                ...state,
                zonaList: [...state.zonaList, action.payload]
            };
        case OBTENER:
            return {
                ...state,
                zonaActual: action.payload
            };
        case ACTUALIZAR:
            return {
                ...state,
                zonaList: state.zonaList.map(
                    zona => zona.id === action.payload.id ? action.payload : zona
                )
            };
        case ELIMINAR:
            return {
                ...state,
                zonaList: state.zonaList.filter( zona => zona.id !== action.payload)
            }
        case OBTENER_LISTA_ACTIVAS:
            return {
                ...state,
                paisList: action.payload
            };
        default:
            return state;
    }
}