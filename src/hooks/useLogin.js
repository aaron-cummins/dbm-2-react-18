import { createUserAdapter, loginAdapter } from "../adapters";
import { login, obtenerUsuarioCorreo } from "../services/usuarioService";
import { useIsAuthenticated } from "@azure/msal-react";
import { LoginContext } from "../contexts/LoginContext";
import {
  LogOut,
  persistUsuarioState,
  persistJwt,
  getUsuarioLugarTrabajo,
} from "../utilities/Login_utiles";
import useFetchAndLoad from "./useFetchAndLoad";

import { useContext } from "react";

const useLogin = () => {
  const isAuthenticated = useIsAuthenticated();
  const { setLogeado, crearUsuario, setMensajeErr, setMensajeOk, setMenuUsuario } =
    useContext(LoginContext);
  const { callEndpoint, setLoading } = useFetchAndLoad();

  const entrar = async (correo) => {
    if (isAuthenticated) {
      const userServices = await obtenerUsuarioCorreo(correo);
      const user = await callEndpoint(userServices);

      if (user && user.data) {
        //console.log('Encontro datos');
        const adapUser = createUserAdapter(user.data);
        crearUsuario(adapUser);
        persistUsuarioState(adapUser);

        setMenuUsuario(await getUsuarioLugarTrabajo());

        setMensajeOk("Logeado con Exito!");
        setMensajeErr(null);
        setLogeado(true);
      } else {
        LogOut();

        setMensajeErr("No se encontró el usuario, póngase en contacto con Soporte DBM");
        setMensajeOk(null);
        setLogeado(false);
      }
    } else {
      setMensajeErr(
        "No se encontró el usuario (no se pudo recuperar el token), póngase en contacto con Soporte DBM"
      );
      LogOut();
      //clearUsuarioState();
      setMensajeOk(null);
      setLogeado(false);
    }

    //console.log(logeado);
    setLoading(false);

    setTimeout(() => {
      setMensajeErr(null);
      setMensajeOk(null);
    }, 5000);
  };

  const JWT = async (correo) => {
    const credenciales = loginAdapter(correo);
    const jwt = await callEndpoint(login(credenciales));

    console.log(jwt.data);

    if (jwt && jwt.data) {
      await persistJwt(jwt.data.access_token, jwt.data.refresh_token);
      //await entrar(correo);
      return true;
    } else {
      return false;
    }
  };

  return { entrar, JWT };
};

export default useLogin;
