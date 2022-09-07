import React, { useEffect, useContext } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { EquipoContext } from "../context/equipoContext";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { Alerts } from "../../../components";

const TablaEquipos = () => {
  const {
    equipoList,
    obtenerEquipos,
    obtenerEquipo,
    mensaje,
    setMensajen,
    tipoAlerta,
    setTipoAlerta,
    actualizarEquipo,
  } = useContext(EquipoContext);
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getEquipo = (props) => {
    obtenerEquipo(props);
  };

  const colActivo = (props) => (
    <button
      type="button"
      className={`text-white py-1 px-2 capitalize rounded-2xl text-md ${
        props.activo ? "bg-green-light-cummins" : "bg-red-cummins"
      }`}>
      {props.activo ? "SI" : "NO"}
    </button>
  );

  const colAcciones = (props) => (
    <>
      <button
        type="button"
        onClick={() => getEquipo(props)}
        className={`text-white py-1 px-2 capitalize rounded-2xl text-md bg-blue-light-cummins`}
        data-bs-toggle="modal"
        data-bs-target="#equipo-modal">
        <FaRegEdit />
      </button>

      <button
        type="button"
        className={`text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-cummins`}>
        <MdOutlineDelete />
      </button>
    </>
  );

  useEffect(() => {
    obtenerEquipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje ? <Alerts type={tipoAlerta}>{mensaje}</Alerts> : null}
      <GridComponent
        dataSource={equipoList}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        //queryCellInfo={queryCellInfoEvent}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" width="100" textAlign="center" />
          <ColumnDirective field="nombre" headerText="Nombre" width="100" />

          <ColumnDirective field="oem_id" headerText="Oem" width="100" textAlign="center" />

          <ColumnDirective
            field="aplicacion_oem_id"
            headerText="Aplicación"
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
        <Inject services={[Search, Page, Sort, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default TablaEquipos;
