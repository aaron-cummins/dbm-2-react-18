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
import { ComunaContext } from "../context/comunaContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla } from "../../../components";

const TablaComunas = () => {
  const { comunaList, obtenerComunas, obtenerComuna } = useContext(ComunaContext);
  const { mensaje } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true, allowAdding: true };
  const toolbarOptions = ["Search"];

  const getComuna = (props) => obtenerComuna(props);
  const colActivo = (props) => <ColActivoTabla activo={props.activo} />;
  const colAcciones = (props) => (
    <OpcionesTabla editar={true} FnEditar={() => getComuna(props)} nombreform="comuna" />
  );

  useEffect(() => {
    obtenerComunas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={comunaList}
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
          <ColumnDirective field="region.nombre" headerText="Región" width="100" />
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

export default TablaComunas;
