import {
  OBTENER_LISTA_APLICACION,
  OBTENER_LISTA_APLICACION_OEM,
  OBTENER_LISTA_CARGOS,
  OBTENER_LISTA_COMUNAS,
  OBTENER_LISTA_FLOTAS,
  OBTENER_LISTA_LUGAR_TRABAJO,
  OBTENER_LISTA_MODULOS,
  OBTENER_LISTA_OEM,
  OBTENER_LISTA_PAISES,
  OBTENER_LISTA_REGIONES,
  OBTENER_LISTA_ROLES,
  OBTENER_LISTA_TIPO_LUGAR_TRABAJO,
  OBTENER_LISTA_VERSION_EQUIPO,
  OBTENER_LISTA_ZONAS,
  OBTENER_LISTA_TIPO_CONTRATOS,
  OBTENER_LISTA_MONITOREO_FILTRO,
  OBTENER_LISTA_MONITOREO_MOTOR,
  OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
} from "../const/actionTypes";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA_LUGAR_TRABAJO:
      return {
        ...state,
        lugarTrabajoList: action.payload,
      };
    case OBTENER_LISTA_REGIONES:
      return {
        ...state,
        regionListActiva: action.payload,
      };

    case OBTENER_LISTA_ZONAS:
      return {
        ...state,
        zonaList: action.payload,
      };
    case OBTENER_LISTA_TIPO_LUGAR_TRABAJO:
      return {
        ...state,
        tipoLugarTrabajoList: action.payload,
      };
    case OBTENER_LISTA_COMUNAS:
      return {
        ...state,
        comunaList: action.payload,
      };
    case OBTENER_LISTA_CARGOS:
      return {
        ...state,
        cargosList: action.payload,
      };
    case OBTENER_LISTA_PAISES:
      return {
        ...state,
        paisList: action.payload,
      };
    case OBTENER_LISTA_MODULOS:
      return {
        ...state,
        modulosList: action.payload,
      };
    case OBTENER_LISTA_ROLES:
      return {
        ...state,
        rolesList: action.payload,
      };

    case OBTENER_LISTA_APLICACION_OEM:
      return {
        ...state,
        aplicacionOemsList: action.payload,
      };

    case OBTENER_LISTA_APLICACION:
      return {
        ...state,
        aplicacionesList: action.payload,
      };

    case OBTENER_LISTA_OEM:
      return {
        ...state,
        oemsList: action.payload,
      };
    case OBTENER_LISTA_FLOTAS:
      return {
        ...state,
        flotasList: action.payload,
      };
    case OBTENER_LISTA_VERSION_EQUIPO:
      return {
        ...state,
        versionEquiposList: action.payload,
      };
    case OBTENER_LISTA_TIPO_CONTRATOS:
      return {
        ...state,
        tipoContratoList: action.payload,
      };

    case OBTENER_LISTA_MONITOREO_FILTRO:
      return {
        ...state,
        monitoreoFiltroList: action.payload,
      };

    case OBTENER_LISTA_MONITOREO_MOTOR:
      return {
        ...state,
        monitoreoMotorList: action.payload,
      };

    case OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO:
      return {
        ...state,
        flotasLugarTrabajoList: action.payload,
      };
    default:
      return state;
  }
  //import/no-anonymous-default-export
};
