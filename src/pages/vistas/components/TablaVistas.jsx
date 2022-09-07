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
import { VistasContext } from "../context/vistasContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla } from "../../../components";

const TablaVistas = () => {
  const { vistasList, obtenerVistas, obtenerVistaslist } = useContext(VistasContext);
  const { mensaje } = useStateContext();
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getVistas = (props) => obtenerVistas(props);
  const colAcciones = (props) => (
    <OpcionesTabla editar={true} FnEditar={() => getVistas(props)} nombreform="vistas" />
  );

  useEffect(() => {
    obtenerVistaslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={vistasList}
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
          <ColumnDirective field="accion" headerText="Acción" width="100" textAlign="center" />
          <ColumnDirective
            field="controller"
            headerText="controller"
            width="100"
            textAlign="center"
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

export default TablaVistas;
