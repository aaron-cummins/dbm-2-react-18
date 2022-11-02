import React from "react";
import { Header, Modal } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { UsuarioContextProvider } from "./context/usuarioContext";

import FormUsuario from "./components/FormUsuario";
import TablaUsuario from "./components/TablaUsuario";

const Usuario = () => {
  const { currentColor } = useStateContext();
  return (
    <UsuarioContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Usuario">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#usuario-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nuevo Usuario
          </button>
        </Header>

        <TablaUsuario />

        <Modal ModalTitle="Usuario" modalId="usuario-modal">
          <FormUsuario />
        </Modal>
      </div>
    </UsuarioContextProvider>
  );
};

export default Usuario;
