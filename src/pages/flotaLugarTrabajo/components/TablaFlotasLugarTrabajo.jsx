import React, { useEffect, useContext } from "react";
import { FlotaLugarTrabajoContext } from "../context/flotaLugarTrabajoContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";

const TablaFlotasLugarTrabajo = () => {
  const {
    flotaLugarTrabajoList,
    obtenerFlotasLugarTrabajo,
    obtenerFlotaLugarTrabajo,
  } = useContext(FlotaLugarTrabajoContext);

  const { obtenerFlotas } = useContext(SelectsContext);

  const { mensaje } = useStateContext();
  const getFlota = (props) => obtenerFlotaLugarTrabajo(props);

  useEffect(() => {
    obtenerFlotasLugarTrabajo();
    obtenerFlotas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Flota", selector: (row) => row.flotasId, sortable: true },
    {
      name: "Lugar Trabajo",
      selector: (row) => row.lugarTrabajoId,
      sortable: true,
    },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getFlota(props)}
          nombreform="flotalugartrabajo"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={flotaLugarTrabajoList} />
    </>
  );
};

export default TablaFlotasLugarTrabajo;