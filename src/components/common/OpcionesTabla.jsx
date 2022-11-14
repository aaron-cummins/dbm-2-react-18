import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";

const OpcionesTabla = ({
  editar,
  FnEditar,
  eliminar,
  FnEliminar,
  info,
  FnInfo,
  nombreform,
}) => {
  const buttonStyle = "text-white py-1 px-2 capitalize rounded-2xl text-md";

  return (
    <>
      {editar && (
        <button
          type="button"
          onClick={() => FnEditar()}
          className={`${buttonStyle} bg-blue-light-cummins`}
          data-bs-toggle="modal"
          data-bs-target={`#${nombreform}-modal`}>
          <FaRegEdit />
        </button>
      )}

      {info && (
        <button
          type="button"
          onClick={() => FnInfo()}
          className={`${buttonStyle} bg-yellow-400`}>
          <GrContactInfo />
        </button>
      )}

      {eliminar && (
        <button
          type="button"
          onClick={() => FnEliminar()}
          className={`${buttonStyle} bg-red-cummins`}>
          <MdOutlineDelete />
        </button>
      )}
    </>
  );
};

export default OpcionesTabla;
