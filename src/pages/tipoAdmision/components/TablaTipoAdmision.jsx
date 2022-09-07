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
import { TipoAdmisionContext } from "../context/tipoadmisionContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla } from "../../../components";

const TablaTipoAdmision = () => {
  const { tipoadmisionList, obtenerTipoAdmisiones, obtenerTipoAdmision } =
    useContext(TipoAdmisionContext);
  const { mensaje } = useStateContext();
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getTipoAdmision = (props) => obtenerTipoAdmision(props);
  const colActivo = (props) => <ColActivoTabla activo={props.activo} />;
  const colAcciones = (props) => (
    <OpcionesTabla
      editar={true}
      FnEditar={() => getTipoAdmision(props)}
      nombreform="tipoadmision"
    />
  );

  useEffect(() => {
    obtenerTipoAdmisiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={tipoadmisionList}
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

export default TablaTipoAdmision;
