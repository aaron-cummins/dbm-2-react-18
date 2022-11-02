import { OBTENER_LISTA_CARGOS, OBTENER_LISTA_COMUNAS, OBTENER_LISTA_LUGAR_TRABAJO, OBTENER_LISTA_MODULOS, OBTENER_LISTA_PAISES, OBTENER_LISTA_REGIONES, OBTENER_LISTA_ROLES, OBTENER_LISTA_TIPO_LUGAR_TRABAJO, OBTENER_LISTA_ZONAS} from '../const/actionTypes';

export default (state, action) => {
    
    switch (action.type) {
        case OBTENER_LISTA_LUGAR_TRABAJO:
            return {
                ...state,
                lugarTrabajoList: action.payload
            };
        case OBTENER_LISTA_REGIONES:
            return {
                ...state,
                regionListActiva: action.payload
            };
        
        case OBTENER_LISTA_ZONAS:
            return {
                ...state,
                zonaList: action.payload
            };
        case OBTENER_LISTA_TIPO_LUGAR_TRABAJO:
            return {
                ...state,
                tipoLugarTrabajoList: action.payload
            };
        case OBTENER_LISTA_COMUNAS:
            return {
                ...state,
                comunaList: action.payload
            };
        case OBTENER_LISTA_CARGOS:
            return {
                ...state,
                cargosList: action.payload
            };
        case OBTENER_LISTA_PAISES:
            return {
                ...state,
                paisList: action.payload
            };
        case OBTENER_LISTA_MODULOS:
            return {
                ...state,
                modulosList: action.payload
            };
            case OBTENER_LISTA_ROLES:
                return {
                    ...state,
                    rolesList: action.payload
                };
        default:
            return state;
    }
   //import/no-anonymous-default-export
}