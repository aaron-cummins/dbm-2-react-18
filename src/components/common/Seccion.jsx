import React from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TbNewSection } from "react-icons/tb";

const Seccion = (props) => {
  return (
    <div className="mb-5 border-solid border-1">
      <div className="flex justify-between items-center gap-2 mb-1 pl-2 pr-2 bg-gray-50 ">
        <p className="text-sm text-gray-00 uppercase font-semibold inline-flex items-center gap-2">
          <TbNewSection />
          {props.titulo}
        </p>
        <p>{props.icono ? props.icono : <AiOutlineAppstoreAdd />}</p>
      </div>
      <div className="justify-between items-center mb-2 mt-1 pl-2 pr-2 p-4">{props.children}</div>
    </div>
  );
};

export default Seccion;
