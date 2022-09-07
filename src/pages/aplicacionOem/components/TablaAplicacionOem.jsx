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
import { AplicacionOemContext } from "../context/aplicacionOemContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla } from "../../../components";

const TablaAplicacionOem = () => {
  const { aplicacionOemList, obtenerAplicacionOem, obtenerAplicacionesOem } =
    useContext(AplicacionOemContext);
  const { mensaje } = useStateContext();

  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getAplicacionOem = (props) => {
    obtenerAplicacionOem(props);
  };

  const colActivo = (props) => <ColActivoTabla activo={props.activo} />;

  const colAcciones = (props) => (
    <OpcionesTabla
      editar={true}
      FnEditar={() => getAplicacionOem(props)}
      nombreform="aplicacionoem"
    />
  );

  useEffect(() => {
    obtenerAplicacionesOem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={aplicacionOemList}
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

export default TablaAplicacionOem;
