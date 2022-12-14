import React from "react";
import { UnidadContextProvider } from "./context/unidadContext";
import { Outlet } from "react-router-dom";

const Unidad = () => {
  return (
    <UnidadContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Outlet />
      </div>
    </UnidadContextProvider>
  );
};

export default Unidad;
