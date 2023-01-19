import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import amReducer from "../reducer/amReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const AmContext = createContext();

export const AmContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "am";

  const initialState = {
    amList: [],
    amActual: null,
  };

  const [state, dispatch] = useReducer(amReducer, initialState);

  /* OBETENER LISTADO DE AMS */
  const obtenerAmes = async () => {
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

  /* OBTENER UN AM */
  const obtenerAm = async (am) => {
    try {
      let amEncontrado = null;
      if (am !== null) {
        const resultado = await callEndpoint(getByID(urlApi, am.id));
        if (resultado && resultado.data) {
          amEncontrado = resultado.data;
        }
      } else {
        amEncontrado = am;
      }

      dispatch({
        type: OBTENER,
        payload: amEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR AM */
  const registrarAm = async (am) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, am));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación creada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear la aplicación. ${error}`);
    }
  };

  /* ACTUALIZAR AM */
  const actualizarAm = async (am) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, am));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Aplicación actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar la aplicación. ${error}`);
    }
  };

  /* ELIMINAR AM */
  const eliminarAm = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Aplicación eliminada con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar la aplicación. ${error}`);
    }
  };

  return (
    <AmContext.Provider
      value={{
        amList: state.amList,
        amActual: state.amActual,

        obtenerAmes,
        obtenerAm,
        registrarAm,
        actualizarAm,
        eliminarAm,
      }}>
      {props.children}
    </AmContext.Provider>
  );
};
