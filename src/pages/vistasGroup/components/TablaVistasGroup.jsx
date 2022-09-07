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
import { VistasGroupContext } from "../context/vistasGroupContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla } from "../../../components";

const TablaVistasGroup = () => {
  const { vistasgroupList, obtenerVistasGrouplist, obtenerVistasGroup } =
    useContext(VistasGroupContext);
  const { mensaje } = useStateContext();
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getVistasGroup = (props) => obtenerVistasGroup(props);
  const colAcciones = (props) => (
    <OpcionesTabla editar={true} FnEditar={() => getVistasGroup(props)} nombreform="vistasgroup" />
  );

  useEffect(() => {
    obtenerVistasGrouplist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={vistasgroupList}
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
          <ColumnDirective field="id_modulo" headerText="Modulo" width="100" />
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

export default TablaVistasGroup;
