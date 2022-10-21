import React, { createContext, useReducer, useState } from "react";
import { OBTENER, OBTENER_MENU, OBTENER_ACCIONES } from "../const/actionTypes";
import loginReducer from "../reducer/loginReducer";
import useFetchAndLoad from "../hooks/useFetchAndLoad";
import { getByID } from "../services/genericService";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const [mensajeErr, setMensajeErr] = useState(null);
  const [mensajeOk, setMensajeOk] = useState(null);
  const [logeado, setLogeado] = useState(false);
  //const [permisos, setPermisos] = useState(null);

  const initialState = {
    usuarioLogeado: null,
    menuUsuario: [],
    paginas: [],
  };

  const [state, dispatch] = useReducer(loginReducer, initialState);

  const crearUsuario = async (usuario) => {
    try {
      dispatch({
        type: OBTENER,
        payload: usuario,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setMenuUsuario = async (id_lugar_trabajo) => {
    try {
      let permisos = [
        {
          id: 0,
          nombre: "Inicio",
          controller: "inicio",
          accion: "ecommerce",
          icono: 0,
        },
      ];

      /*let modulos = JSON.parse(sessionStorage.getItem("user_info"));

      modulos.permisos.forEach((item) => {
        if (item.lugarTrabajo === id_lugar_trabajo) {
          let permisosGlob = item.roles.permisosGlobales;
          permisosGlob.forEach((i) => {
            i.modulo && permisos.push(i.modulo);
          });
        }
      });*/
      dispatch({
        type: OBTENER_MENU,
        payload: permisos,
      });

      let grupo = permisos
        .map((item) => item.grupos)
        .filter((element) => element !== undefined);
      let vistas = grupo.map((grup) => grup.map((vistas) => vistas.vistas));
      let acciones = vistas.flat(2);

      dispatch({
        type: OBTENER_ACCIONES,
        payload: acciones,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA MODULOS */
  const obtenerModulos = async (id_modulo) => {
    try {
      let modulosEncontrada = null;
      if (id_modulo !== null) {
        const resultado = await callEndpoint(getByID("modulos", id_modulo));
        if (resultado && resultado.data) {
          modulosEncontrada = resultado.data;
        }
      }
      return modulosEncontrada;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        usuarioLogeado: state.usuarioLogeado,
        menuUsuario: state.menuUsuario,
        paginas: state.paginas,

        setMenuUsuario,

        logeado,
        setLogeado,

        crearUsuario,
        obtenerModulos,
        mensajeErr,
        setMensajeErr,
        mensajeOk,
        setMensajeOk,
      }}>
      {props.children}
    </LoginContext.Provider>
  );
};
