import React, { createContext, useReducer } from "react";
import {
  OBTENER,
  OBTENER_LISTA,
  REGISTRAR,
  ACTUALIZAR,
  ELIMINAR,
} from "const/actionTypes";
import {
  getList,
  getByID,
  postObject,
  putObject,
  deleteObject,
} from "services/genericService";
import equipoReducer from "../reducer/equipoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";

import { useStateContext } from "contexts/ContextProvider";

export const EquipoContext = createContext();

export const EquipoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "equipo";

  const initialState = {
    equipoList: [],
    equipoListActiva: [],
    equipoActual: null,
  };

  const [state, dispatch] = useReducer(equipoReducer, initialState);

  /* OBETENER LISTADO DE EQUIPOS */
  const obtenerEquipos = async () => {
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

  /* OBTENER UNA EQUIPO */
  const obtenerEquipo = async (equipo) => {
    try {
      let equipoEncontrada = null;
      if (equipo !== null) {
        const resultado = await callEndpoint(getByID(urlApi, equipo.id));
        if (resultado && resultado.data) {
          equipoEncontrada = resultado.data;
        }
      } else {
        equipoEncontrada = equipo;
      }

      dispatch({
        type: OBTENER,
        payload: equipoEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR EQUIPO */
  const registrarEquipo = async (equipo) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, equipo));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Región creada con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear la región. ${error}`
      );
    }
  };

  /* ACTUALIZAR EQUIPO */
  const actualizarEquipo = async (equipo) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, equipo));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Región actualizada con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar la región. ${error}`
      );
    }
  };

  /* ELIMINAR EQUIPO */
  const eliminarEquipo = async (id) => {
    try {
      const resultado = await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Equipo eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el equipo. ${error}`
      );
    }
  };

  return (
    <EquipoContext.Provider
      value={{
        equipoList: state.equipoList,
        equipoActual: state.equipoActual,

        obtenerEquipos,
        obtenerEquipo,
        registrarEquipo,
        actualizarEquipo,
        eliminarEquipo,
      }}>
      {props.children}
    </EquipoContext.Provider>
  );
};
