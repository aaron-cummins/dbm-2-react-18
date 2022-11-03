import React, { useEffect, useContext } from "react";
import { VersionEquipoContext } from "../context/versionEquipoContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaVersionEquipo = () => {
  const { versionequipoList, obtenerVersionEquipos, obtenerVersionEquipo } =
    useContext(VersionEquipoContext);
  const { mensaje } = useStateContext();

  const getVersionEquipo = (props) => obtenerVersionEquipo(props);

  useEffect(() => {
    obtenerVersionEquipos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Versión", selector: (row) => row.version, sortable: true },
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
          FnEditar={() => getVersionEquipo(props)}
          nombreform="versionequipo"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={versionequipoList} />
    </>
  );
};

export default TablaVersionEquipo;
