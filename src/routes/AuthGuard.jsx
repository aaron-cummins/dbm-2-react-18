import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { ErrorPage } from "../pages";

const AuthGuard = () => {
  const { paginas } = useContext(LoginContext);
  const { pathname } = useLocation();

  const path_location = pathname.substring(1);
  const path_acciones = paginas.map((path) => path.accion);
  const acceso = path_acciones.find((dir) => dir === path_location) === path_location;

  return acceso ? <Outlet /> : <ErrorPage />;
};

export default AuthGuard;
