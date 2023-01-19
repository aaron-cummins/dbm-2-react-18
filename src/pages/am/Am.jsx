import React from "react";
import { Header, Modal } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { AmContextProvider } from "./context/amContext";

import FormAm from "./components/FormAm";
import TablaAm from "./components/TablaAm";

const Am = () => {
  const { currentColor } = useStateContext();
  return (
    <AmContextProvider>
      <div className="m-1 p-7 bg-white rounded-3xl">
        <Header category="Administración" title="Am">
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#am-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
            Nueva Am
          </button>
        </Header>

        <TablaAm />

        <Modal ModalTitle="Am" modalId="am-modal">
          <FormAm modalid="#am-modal" />
        </Modal>
      </div>
    </AmContextProvider>
  );
};

export default Am;
