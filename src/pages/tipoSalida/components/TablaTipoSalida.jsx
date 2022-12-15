import React, { useEffect, useContext } from "react";
import { TipoSalidaContext } from "../context/TipoSalidaContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaTipoSalida = () => {
  const { TipoSalidaList, obtenerTipoSalida, obtenerTipoSalidas } =
  useContext(TipoSalidaContext);
  const { mensaje } = useStateContext();

  const getTipoSalida = (props) => {
    obtenerTipoSalida(props);
  };

  useEffect(() => {
    obtenerTipoSalidas();
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
          FnEditar={() => getTipoSalida(props)}
          nombreform="tiposalida"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={TipoSalidaList} />
    </>
  );
}

export default TablaTipoSalida