import React, { createContext, useReducer } from "react";
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import eemmReducer from "../reducer/eemmReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const EemmContext = createContext();

export const EemmContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "eemm";

  const initialState = {
    eemmList: [],
    eemmActual: null,
  };

  const [state, dispatch] = useReducer(eemmReducer, initialState);

  /* OBETENER LISTADO DE EEMMS */
  const obtenerEemmlist = async () => {
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

  /* OBTENER UNA EEMM */
  const obtenerEemm = async (eemm) => {
    try {
      let eemmEncontrada = null;
      if (eemm !== null) {
        const resultado = await callEndpoint(getByID(urlApi, eemm.id));
        if (resultado && resultado.data) {
          eemmEncontrada = resultado.data;
        }
      } else {
        eemmEncontrada = eemm;
      }

      dispatch({
        type: OBTENER,
        payload: eemmEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR EEMM */
  const registrarEemm = async (eemm) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, eemm));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Rol creado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar crear el Rol. ${error}`);
    }
  };

  /* ACTUALIZAR EEMM */
  const actualizarEemm = async (eemm) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, eemm));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Rol actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Rol. ${error}`);
    }
  };

  /* ELIMINAR EEMM */
  const eliminarEemm = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Rol eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el Rol. ${error}`);
    }
  };

  return (
    <EemmContext.Provider
      value={{
        eemmList: state.eemmList,
        eemmActual: state.eemmActual,

        obtenerEemmlist,
        obtenerEemm,
        registrarEemm,
        actualizarEemm,
        eliminarEemm,
      }}>
      {props.children}
    </EemmContext.Provider>
  );
};
