import { OBTENER_LISTA, REGISTRAR, OBTENER, ACTUALIZAR, ELIMINAR} from '../../../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA:
            return {
                ...state,
                usuarioList: action.payload
            };
        case REGISTRAR:
            return {
                ...state,
                usuarioList: [...state.usuarioList, action.payload]
            };
        case OBTENER:
            return {
                ...state,
                usuarioActual: action.payload
            };
        case ACTUALIZAR:
            return {
                ...state,
                usuarioList: state.usuarioList.map(
                    usuario => usuario.id === action.payload.id ? action.payload : usuario
                )
            };
        case ELIMINAR:
            return {
                ...state,
                usuarioList: state.usuarioList.filter( usuario => usuario.id !== action.payload)
            }
        default:
            return state;
    }
}