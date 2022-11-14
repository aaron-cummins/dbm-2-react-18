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
import usuarioReducer from "../reducer/usuarioReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

export const UsuarioContext = createContext();

export const UsuarioContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "usuarios";

  const initialState = {
    usuarioList: [],
    usuarioActual: null,
  };

  const [state, dispatch] = useReducer(usuarioReducer, initialState);

  /* OBETENER LISTADO DE USUARIOS */
  const obtenerUsuariolist = async () => {
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

  /* OBTENER UNA USUARIO */
  const obtenerUsuario = async (usuario) => {
    try {
      let usuarioEncontrada = null;
      if (usuario !== null) {
        const resultado = await callEndpoint(getByID(urlApi, usuario.id));
        if (resultado && resultado.data) {
          usuarioEncontrada = resultado.data;
        }
      } else {
        usuarioEncontrada = usuario;
      }

      dispatch({
        type: OBTENER,
        payload: usuarioEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR USUARIO */
  const registrarUsuario = async (usuario) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, usuario));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Usuario creado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar crear el Usuario. ${error}`
      );
    }
  };

  /* ACTUALIZAR USUARIO */
  const actualizarUsuario = async (usuario) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, usuario));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Usuario actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar actualizar el Usuario. ${error}`
      );
    }
  };

  /* ELIMINAR USUARIO */
  const eliminarUsuario = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Usuario eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta(
        "danger",
        `'Ocurrió un error al intentar eliminar el Usuario. ${error}`
      );
    }
  };

  return (
    <UsuarioContext.Provider
      value={{
        usuarioList: state.usuarioList,
        usuarioActual: state.usuarioActual,

        obtenerUsuariolist,
        obtenerUsuario,
        registrarUsuario,
        actualizarUsuario,
        eliminarUsuario,
      }}>
      {props.children}
    </UsuarioContext.Provider>
  );
};
