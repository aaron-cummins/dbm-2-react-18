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
import PostTratamientoReducer from "../reducer/PostTratamientoReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const PostTratamientoContext = createContext();

export const PostTratamientoContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();

  const urlApi = "posttratamiento";

  const initialState = {
    PostTratamientoList: [],
    PostTratamientoActual: null,
  };

  const [state, dispatch] = useReducer(PostTratamientoReducer, initialState);

  /* OBTENER LISTADO DE POST TRATAMIENTO */
  const obtenerPostTratamientos = async () => {
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

  /* OBTENER UN POSTTRATAMIENTO */
  const obtenerPostTratamiento = async (aplicacionoem) => {
    try {
      let aplicacionoemEncontrado = null;
      if (aplicacionoem !== null) {
        const resultado = await callEndpoint(getByID(urlApi, aplicacionoem.id));
        if (resultado && resultado.data) {
          aplicacionoemEncontrado = resultado.data;
        }
      } else {
        aplicacionoemEncontrado = aplicacionoem;
      }

      dispatch({
        type: OBTENER,
        payload: aplicacionoemEncontrado,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR POSTTRATAMIENTO */
  const registrarPostTratamiento = async (aplicacionoem) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, aplicacionoem));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Post tratamiento creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el Post tratamiento. ${error}`
      );
    }
  };

  /* ACTUALIZAR POSTTRATAMIENTO*/
  const actualizarPostTratamiento = async (aplicacionoem) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, aplicacionoem));
      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Post tratamiento actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el Post tratamiento. ${error}`
      );
    }
  };

  /* ELIMINAR POSTTRATAMIENTO */
  const eliminarPostTratamiento = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Post tratamiento eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el Post tratamiento. ${error}`
      );
    }
  };

  return (
    <PostTratamientoContext.Provider
      value={{
        PostTratamientoList: state.PostTratamientoList,
        PostTratamientoActual: state.PostTratamientoActual,

        obtenerPostTratamientos,
        obtenerPostTratamiento,
        registrarPostTratamiento,
        actualizarPostTratamiento,
        eliminarPostTratamiento,
      }}>
      {props.children}
    </PostTratamientoContext.Provider>
  );
}

export default PostTratamientoContext