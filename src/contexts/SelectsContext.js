import React, { createContext, useReducer } from "react";
import {
  OBTENER_LISTA_APLICACION,
  OBTENER_LISTA_APLICACION_OEM,
  OBTENER_LISTA_CARGOS,
  OBTENER_LISTA_COMUNAS,
  OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO,
  OBTENER_LISTA_CONVERSION_FLOTA,
  OBTENER_LISTA_FLOTAS,
  OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
  OBTENER_LISTA_FUENTE_INFORMACION,
  OBTENER_LISTA_LUGAR_TRABAJO,
  OBTENER_LISTA_MODULOS,
  OBTENER_LISTA_OEM,
  OBTENER_LISTA_PAISES,
  OBTENER_LISTA_REGIONES,
  OBTENER_LISTA_ROLES,
  OBTENER_LISTA_TIPO_LUGAR_TRABAJO,
  OBTENER_LISTA_TIPO_CONTRATOS,
  OBTENER_LISTA_UNIDAD,
  OBTENER_LISTA_VERSION_EQUIPO, 
  OBTENER_LISTA_ZONAS,
  OBTENER_LISTA_MONITOREO_FILTRO,
  OBTENER_LISTA_MONITOREO_MOTOR,
} from "const/actionTypes";
import { getByID, getList } from "services/genericService";
import selectsReducer from "reducer/selectsReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

export const SelectsContext = createContext();

export const SelectsContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const initialState = {
    aplicacionesList: [],
    aplicacionOemsList: [],
    cargosList: [],
    comunaList: [],
    conversionLugarTrabajoList: [],
    conversionFlotaList: [],
    flotasList: [],
    flotasLugarTrabajoList: [],
    fuenteInformacionList: [],
    lugarTrabajoList: [],
    modulosList: [],
    monitoreoMotorList: [],
    monitoreoFiltroList: [],
    oemsList: [],
    paisList: [],
    regionListActiva: [],
    rolesList: [],
    tipoLugarTrabajoList: [],
    tipoContratoList: [],
    unidadList: [],
    versionEquiposList: [],
    zonaList: [],
  };

  const [state, dispatch] = useReducer(selectsReducer, initialState);

  /* OBETENER LISTADO DE PAISES ACTIVAS */
  const obtenerPais = async () => {
    try {
      const resultado = await callEndpoint(getList("pais"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_PAISES,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE REGIONES ACTIVAS */
  const obtenerRegiones = async () => {
    try {
      const resultado = await callEndpoint(getList("region"));
      if (resultado && resultado.data) {
        let RegionActivas = [];
        resultado.data.forEach((item) => {
          item.activo && RegionActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_REGIONES,
          payload: RegionActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Zona ACTIVAS */
  const obtenerZonas = async () => {
    try {
      const resultado = await callEndpoint(getList("zona"));
      if (resultado && resultado.data) {
        let ZonasActivas = [];
        resultado.data.forEach((item) => {
          item.activo && ZonasActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_ZONAS,
          payload: ZonasActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE tipo lugar de trabajo ACTIVAS */
  const obtenerTipoLugarTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("tipolugartrabajo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE comuna ACTIVAS */
  const obtenerComunas = async () => {
    try {
      const resultado = await callEndpoint(getList("comuna"));
      if (resultado && resultado.data) {
        let ComunasActivas = [];
        resultado.data.forEach((item) => {
          item.activo && ComunasActivas.push(item);
        });

        dispatch({
          type: OBTENER_LISTA_COMUNAS,
          payload: ComunasActivas,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Lugar de trabajo */
  const obtenerLugaresTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("lugartrabajo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE MODULOSS */
  const obtenerModulos = async () => {
    try {
      const resultado = await callEndpoint(getList("modulos"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MODULOS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Rol */
  const obtenerRol = async () => {
    try {
      const resultado = await callEndpoint(getList("roles"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ROLES,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Cargos */
  const obtenerCargos = async () => {
    try {
      const resultado = await callEndpoint(getList("cargo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CARGOS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerAplicacionOems = async () => {
    try {
      const resultado = await callEndpoint(getList("aplicacionoem"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_APLICACION_OEM,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerOems = async () => {
    try {
      const resultado = await callEndpoint(getList("oem"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_OEM,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Flotas */
  const obtenerFlotas = async () => {
    try {
      const resultado = await callEndpoint(getList("flotas"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FLOTAS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion OEM */
  const obtenerVersionEquipos = async () => {
    try {
      const resultado = await callEndpoint(getList("versionequipo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_VERSION_EQUIPO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion */
  const obtenerAplicaciones = async () => {
    try {
      const resultado = await callEndpoint(getList("aplicacion"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_APLICACION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Aplicacion */
  const obtenerTipoContrato = async () => {
    try {
      const resultado = await callEndpoint(getList("tipocontrato"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_TIPO_CONTRATOS,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Monitoreo Motor */
  const obtenerMonitoreoMotor = async () => {
    try {
      const resultado = await callEndpoint(getList("monitoreomotor"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MONITOREO_MOTOR,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Monitoreo Filtro */
  const obtenerMonitoreoFiltro = async () => {
    try {
      const resultado = await callEndpoint(getList("monitoreofiltro"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_MONITOREO_FILTRO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE Flotas Lugar trabajo */
  const obtenerFlotasLugarTrabajo = async (id) => {
    try {
      const resultado = await callEndpoint(getByID("flotalugartrabajo/filtro", id));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FLOTAS_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE FUENTE DE INFORMACION */
  const obtenerFuenteInformacion = async () => {
    try {
      const resultado = await callEndpoint(getList("fuenteinformacion"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_FUENTE_INFORMACION,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE CONVERSION FLOTA */
  const obtenerConversionFlota = async () => {
    try {
      const resultado = await callEndpoint(getList("conversionflotas"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CONVERSION_FLOTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE UNIDAD */
  const obtenerUnidad = async () => {
    try {
      const resultado = await callEndpoint(getList("unidad"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_UNIDAD,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER LISTADO DE CONVERSION LUGAR TRABAJO*/
  const obtenerConversionLugarTrabajo = async () => {
    try {
      const resultado = await callEndpoint(getList("conversionlugartrabajo"));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_CONVERSION_LUGAR_TRABAJO,
          payload: resultado.data,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SelectsContext.Provider
      value={{
        aplicacionOemsList: state.aplicacionOemsList,
        aplicacionesList: state.aplicacionesList,
        cargosList: state.cargosList,
        comunaList: state.comunaList,
        conversionLugarTrabajoList: state.conversionLugarTrabajoList,
        conversionFlotaList: state.conversionFlotaList,
        flotasList: state.flotasList,
        flotasLugarTrabajoList: state.flotasLugarTrabajoList,
        fuenteInformacionList: state.fuenteInformacionList,
        lugarTrabajoList: state.lugarTrabajoList,
        modulosList: state.modulosList,
        monitoreoFiltroList: state.monitoreoFiltroList,
        monitoreoMotorList: state.monitoreoMotorList,
        oemsList: state.oemsList,
        paisList: state.paisList,
        regionList: state.regionListActiva,
        rolesList: state.rolesList,
        tipoLugarTrabajoList: state.tipoLugarTrabajoList,
        tipoContratoList: state.tipoContratoList,
        unidadList: state.unidadList,
        versionEquiposList: state.versionEquiposList,
        zonaList: state.zonaList,

        obtenerAplicaciones,
        obtenerAplicacionOems,
        obtenerCargos,
        obtenerComunas,
        obtenerConversionLugarTrabajo,
        obtenerConversionFlota,
        obtenerFlotas,
        obtenerFlotasLugarTrabajo,
        obtenerFuenteInformacion,
        obtenerModulos,
        obtenerMonitoreoFiltro,
        obtenerMonitoreoMotor,
        obtenerOems,
        obtenerLugaresTrabajo,
        obtenerPais,
        obtenerRegiones,
        obtenerRol,
        obtenerTipoLugarTrabajo,
        obtenerTipoContrato,
        obtenerUnidad,
        obtenerVersionEquipos,
        obtenerZonas,
      }}>
      {props.children}
    </SelectsContext.Provider>
  );
};
