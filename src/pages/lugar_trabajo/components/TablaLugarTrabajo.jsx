import React, { useContext, useEffect } from "react";
import { LugarTrabajoContext } from "../../../contexts/LugarTrabajoContext";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const TablaLugarTrabajo = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const toolbarOptions = ["Search"];

  const {
    lugartrabajoList,
    obtenerLugaresTrabajo,
    obtenerLugarTrabajo,
    mensaje,
    setMensajen,
    tipoAlerta,
    setTipoAlerta,
    actualizarLugarTrabajo,
  } = useContext(LugarTrabajoContext);

  const colActivo = (props) => (
    <button
      type="button"
      className={`text-white py-1 px-2 capitalize rounded-2xl text-md ${
        props.activo ? "bg-green-light-cummins" : "bg-red-cummins"
      }`}
    >
      {props.activo ? "SI" : "NO"}
    </button>
  );

  const getLugarTrabajo = (props) => {
    obtenerLugarTrabajo(props);
  };

  const colAcciones = (props) => (
    <>
      <button
        type="button"
        onClick={() => getLugarTrabajo(props)}
        className={`text-white py-1 px-2 capitalize rounded-2xl text-md bg-blue-light-cummins`}
        data-bs-toggle="modal"
        data-bs-target="#lugarTrabajo-modal"
      >
        <FaRegEdit />
      </button>

      <button
        type="button"
        className={`text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-cummins`}
      >
        <MdOutlineDelete />
      </button>
    </>
  );

  useEffect(() => {
    obtenerLugaresTrabajo();
  }, []);

  return (
    <GridComponent
      dataSource={lugartrabajoList}
      width="auto"
      allowPaging
      allowSorting
      pageSettings={{ pageCount: 5 }}
      editSettings={editing}
      toolbar={toolbarOptions}
    >
      <ColumnsDirective>
        <ColumnDirective
          field="id"
          headerText="ID"
          width="100"
          textAlign="center"
        />
        <ColumnDirective field="nombre" headerText="Nombre" width="100" />
        <ColumnDirective
          field="abreviacion"
          headerText="Abreviación"
          width="100"
          textAlign="center"
        />
        <ColumnDirective
          field="tipo_lugar_trabajo"
          headerText="Tipo"
          width="100"
          textAlign="center"
        />
        <ColumnDirective
          field="activo"
          headerText="Activo"
          width="100"
          textAlign="center"
          template={colActivo}
        />
        <ColumnDirective
          headerText="Acciones"
          width="100"
          textAlign="center"
          template={colAcciones}
        />
      </ColumnsDirective>
      <Inject services={[Search, Page, Sort]} />
    </GridComponent>
  );
};

export default TablaLugarTrabajo;
