import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "components";
import { useStateContext } from "contexts/ContextProvider";

const PermisosUsuario = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const volver = (props) => {
    navigate("/usuarios");
  };

  return (
    <>
      <Header category="Administración" title="Permisos Usuario">
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          onClick={volver}
          className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
          Volver
        </button>
      </Header>
    </>
  );
};

export default PermisosUsuario;
