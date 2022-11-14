import React, { useEffect, useContext } from "react";
import { UnidadContext } from "../context/unidadContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { formatDateshort } from "utilities/Utiles";

const TablaUnidad = () => {
  const { unidadList, obtenerUnidadlist, obtenerUnidad } =
    useContext(UnidadContext);
  const { mensaje } = useStateContext();
  const { obtenerFlotas, obtenerVersionEquipos, obtenerLugaresTrabajo } =
    useContext(SelectsContext);

  const getUnidad = (props) => obtenerUnidad(props);

  useEffect(() => {
    obtenerUnidadlist();
    obtenerLugaresTrabajo();
    obtenerVersionEquipos();
    obtenerFlotas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombr",
      selector: (row) => row.nombre,
      sortable: true,
    },
    { name: "N Serie", selector: (row) => row.nserieUnidad },
    {
      name: "Fecha Acivación",
      selector: (row) => formatDateshort(row.fechaActivacion),
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getUnidad(props)}
          nombreform="unidad"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={unidadList} />
    </>
  );
};

export default TablaUnidad;
