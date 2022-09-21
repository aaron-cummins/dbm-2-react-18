import React, { createContext, useReducer } from "react";
import {
  OBTENER,
  OBTENER_LISTA,
  REGISTRAR,
  ACTUALIZAR,
  ELIMINAR,
  OBTENER_LISTA_ACTIVAS,
} from "../../../const/actionTypes";
import {
  getList,
  getByID,
  postObject,
  putObject,
  deleteObject,
} from "../../../services/genericService";
import zonaReducer from "../reducer/zonaReuducer";
import useFetchAndLoad from "../../../hooks/useFetchAndLoad";
import { useStateContext } from "../../../contexts/ContextProvider";

export const ZonaContext = createContext();

export const ZonaContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "zona";

  const initialState = {
    zonaList: [],
    zonaActual: null,
    paisList: [],
  };

  const [state, dispatch] = useReducer(zonaReducer, initialState);

  /* OBETENER LISTADO DE ZONAS */
  const obtenerZonalist = async () => {
    try {
      const resultado = await callEndpoint(getList(urlApi));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA ZONA */
  const obtenerZona = async (zona) => {
    try {
      let zonaEncontrada = null;
      if (zona !== null) {
        const resultado = await callEndpoint(getByID(urlApi, zona.id));
        if (resultado && resultado.data) {
          zonaEncontrada = resultado.data;
        }
      } else {
        zonaEncontrada = zona;
      }

      dispatch({
        type: OBTENER,
        payload: zonaEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR ZONA */
  const registrarZona = async (zona) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, zona));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el Módulo. ${error}`
      );
    }
  };

  /* ACTUALIZAR ZONA */
  const actualizarZona = async (zona) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, zona));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Módulo actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el Módulo. ${error}`
      );
    }
  };

  /* ELIMINAR ZONA */
  const eliminarZona = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Módulo eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el Módulo. ${error}`
      );
    }
  };

  return (
    <ZonaContext.Provider
      value={{
        zonaList: state.zonaList,
        zonaActual: state.zonaActual,

        obtenerZonalist,
        obtenerZona,
        registrarZona,
        actualizarZona,
        eliminarZona,
      }}>
      {props.children}
    </ZonaContext.Provider>
  );
};
