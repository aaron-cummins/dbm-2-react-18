import React, { useEffect, useContext } from "react";
import { EstadoEquipoInstalacionContext } from "../context/EstadoEquipoInstalacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoEquipoInstalacion = () => {
  const { EstadoEquipoInstalacionList, obtenerEstadoEquipoInstalacion, obtenerEstadoEquipoInstalaciones } =
  useContext(EstadoEquipoInstalacionContext);
  const { mensaje } = useStateContext();

  const getEstadoEquipoInstalacion = (props) => {
    obtenerEstadoEquipoInstalacion(props);
  };

  useEffect(() => {
    obtenerEstadoEquipoInstalaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
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
          FnEditar={() => getEstadoEquipoInstalacion(props)}
          nombreform="estadoequipoinstalacion"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={EstadoEquipoInstalacionList} />
    </>
  );
}

export default TablaEstadoEquipoInstalacion