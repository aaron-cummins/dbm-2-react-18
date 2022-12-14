import React, { useEffect, useContext } from "react";
import { EstadoEquipoContext } from "../context/EstadoEquipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoEquipo = () => {
  const { EstadoEquipoList, obtenerEstadoEquipo, obtenerEstadoEquipos } =
  useContext(EstadoEquipoContext);
  const { mensaje } = useStateContext();

  const getEstadoEquipo = (props) => {
    obtenerEstadoEquipo(props);
  };

  useEffect(() => {
    obtenerEstadoEquipos();
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
          FnEditar={() => getEstadoEquipo(props)}
          nombreform="estadoequipo"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={EstadoEquipoList} />
    </>
  );
}

export default TablaEstadoEquipo