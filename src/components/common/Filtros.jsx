import React from "react";
import { FiFilter } from "react-icons/fi";
import { useStateContext } from "contexts/ContextProvider";

const Filtros = (props) => {
  const { currentColor } = useStateContext();
  return (
    <div className="mb-5 border-solid border-1">
      <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2 bg-gray-50 ">
        <p className="text-lg text-gray-00">Filtro</p>
        <p>
          <FiFilter />
        </p>
      </div>
      <div className="justify-between items-center mb-2 mt-1 pl-2 pr-2 grid grid-cols-4 gap-4">{props.children}</div>
      <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2">
        <p></p>
        <p>
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#aplicacion-modal"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-1 px-3 py-1.5 hover:drop-shadow-xl hover:bg-${currentColor} text-right inline-flex items-center`}
            onClick={props.Fn}>
            Buscar
          </button>
        </p>
      </div>
    </div>
  );
};

export default Filtros;
