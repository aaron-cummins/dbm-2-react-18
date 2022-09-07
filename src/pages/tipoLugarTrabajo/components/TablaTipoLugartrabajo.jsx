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
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla } from "../../../components";

const TablaTipolugarTrabajo = () => {
  const { tipolugartrabajoList, obtenerTipolugartrabajoList, obtenerTipolugartrabajo } =
    useContext(TipolugartrabajoContext);
  const { mensaje } = useStateContext();
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
  };
  const toolbarOptions = ["Search"];

  const getTipolugartrabajo = (props) => obtenerTipolugartrabajo(props);

  const colAcciones = (props) => (
    <OpcionesTabla
      editar={true}
      FnEditar={() => getTipolugartrabajo(props)}
      nombreform="tipolugartrabajo"
    />
  );

  useEffect(() => {
    obtenerTipolugartrabajoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <GridComponent
        dataSource={tipolugartrabajoList}
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
          <ColumnDirective field="tipo" headerText="Tipo" width="100" textAlign="center" />
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

export default TablaTipolugarTrabajo;
