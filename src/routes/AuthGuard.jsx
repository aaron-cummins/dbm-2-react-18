import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import { ForbiddenPage } from "../pages";

const AuthGuard = () => {
  const { paginas } = useContext(LoginContext);
  const { pathname } = useLocation();

  const path_location = pathname.substring(1);
  const acceso = paginas.find((dir) => dir === path_location) === path_location;
  return acceso ? <Outlet /> : <ForbiddenPage />;
};

export default AuthGuard;
