import React, { createContext, useReducer } from "react";
import {
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
} from "../const/actionTypes";
import { getList } from "../services/genericService";
import selectsReducer from "../reducer/selectsReducer";
import useFetchAndLoad from "../hooks/useFetchAndLoad";

export const SelectsContext = createContext();

export const SelectsContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const initialState = {
    lugarTrabajoList: [],
    zonaList: [],
    tipoLugarTrabajoList: [],
    regionListActiva: [],
    comunaList: [],
    paisList: [],
    modulosList: [],
    rolesList: [],
    cargosList: [],
    aplicacionOemsList: [],
    oemsList: [],
    versionEquiposList: [],
    flotasList: []
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

  return (
    <SelectsContext.Provider
      value={{
        lugarTrabajoList: state.lugarTrabajoList,
        zonaList: state.zonaList,
        tipoLugarTrabajoList: state.tipoLugarTrabajoList,
        regionList: state.regionListActiva,
        comunaList: state.comunaList,
        paisList: state.paisList,
        modulosList: state.modulosList,
        rolesList: state.rolesList,
        cargosList: state.cargosList,
        aplicacionOemsList: state.aplicacionOemsList,
        oemsList: state.oemsList,
        versionEquiposList: state.versionEquiposList,
        flotasList: state.flotasList,

        obtenerAplicacionOems,
        obtenerCargos,
        obtenerComunas,
        obtenerModulos,
        obtenerOems,
        obtenerLugaresTrabajo,
        obtenerPais,
        obtenerRegiones,
        obtenerRol,
        obtenerTipoLugarTrabajo,
        obtenerZonas,
        obtenerFlotas,
        obtenerVersionEquipos
        
      }}>
      {props.children}
    </SelectsContext.Provider>
  );
};
