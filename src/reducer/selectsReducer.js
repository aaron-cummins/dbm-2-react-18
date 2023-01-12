import {
  OBTENER_LISTA_APLICACION,
  OBTENER_LISTA_APLICACION_OEM,
  OBTENER_LISTA_CARGOS,
  OBTENER_LISTA_COMUNAS,
  OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO,
  OBTENER_LISTA_CONVERSION_FLOTA,
  OBTENER_LISTA_FLOTAS,
  OBTENER_LISTA_FUENTE_INFORMACION,
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
  OBTENER_LISTA_UNIDADES,
  OBTENER_LISTA_LUGAR_TRABAJO_USUARIO,
  OBTENER_LISTA_ESN,
  OBTENER_LISTA_TIPO_ADMISION,
  OBTENER_LISTA_TIPO_BLOCK,
  OBTENER_LISTA_TIPO_COMBUSTIBLE,
  OBTENER_LISTA_TIPO_EMISION,
  OBTENER_LISTA_TIPO_FILTRADO,
  OBTENER_LISTA_TIPO_INYECCION,
  OBTENER_LISTA_MOTOR,
  OBTENER_LISTA_MODULO_CONTROL,
  OBTENER_LISTA_POST_TRATAMIENTO,
  OBTENER_LISTA_VERSION_MOTOR,
} from "../const/actionTypes";

//import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case OBTENER_LISTA_LUGAR_TRABAJO:
      return {
        ...state,
        lugarTrabajoList: action.payload,
      };

    case OBTENER_LISTA_LUGAR_TRABAJO_USUARIO:
      return {
        ...state,
        lugarTrabajoUsuarioList: action.payload,
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
    case OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO:
      return {
        ...state,
        conversionLugarTrabajoList: action.payload,
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
    case OBTENER_LISTA_FUENTE_INFORMACION:
      return {
        ...state,
        fuenteInformacionList: action.payload,
      };
    case OBTENER_LISTA_CONVERSION_FLOTA:
      return {
        ...state,
        conversionFlotaList: action.payload,
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
    case OBTENER_LISTA_UNIDADES:
      return {
        ...state,
        unidadesList: action.payload,
      };

    case OBTENER_LISTA_ESN:
      return {
        ...state,
        esnList: action.payload,
      };

    case OBTENER_LISTA_TIPO_ADMISION:
      return {
        ...state,
        tipoAdmisionList: action.payload,
      };

    case OBTENER_LISTA_TIPO_BLOCK:
      return {
        ...state,
        tipoBlockList: action.payload,
      };

    case OBTENER_LISTA_TIPO_COMBUSTIBLE:
      return {
        ...state,
        tipoCombustibleList: action.payload,
      };

    case OBTENER_LISTA_TIPO_EMISION:
      return {
        ...state,
        tipoEmisionList: action.payload,
      };

    case OBTENER_LISTA_TIPO_FILTRADO:
      return {
        ...state,
        tipoFiltradoList: action.payload,
      };

    case OBTENER_LISTA_TIPO_INYECCION:
      return {
        ...state,
        tipoInyeccionList: action.payload,
      };

    case OBTENER_LISTA_MOTOR:
      return {
        ...state,
        motoresList: action.payload,
      };

    case OBTENER_LISTA_MODULO_CONTROL:
      return {
        ...state,
        moduloControlList: action.payload,
      };

    case OBTENER_LISTA_POST_TRATAMIENTO:
      return {
        ...state,
        postTratamientoList: action.payload,
      };

    case OBTENER_LISTA_VERSION_MOTOR:
      return {
        ...state,
        versionMotorList: action.payload,
      };
    default:
      return state;
  }
};
