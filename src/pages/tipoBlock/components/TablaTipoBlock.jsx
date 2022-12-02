import React, { useEffect, useContext } from "react";
import { TipoBlockContext } from "../context/TipoBlockContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla, ColExperimentalTabla } from "components";

const TablaTipoBlock = () => {
  const { TipoBlockList, obtenerTipoBlock, obtenerTipoBlocks } =
  useContext(TipoBlockContext);
  const { mensaje } = useStateContext();

  const getTipoBlock = (props) => {
    obtenerTipoBlock(props);
  };

  useEffect(() => {
    obtenerTipoBlocks();
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
      name: "Experimental",
      cell: (props) => <ColExperimentalTabla experimental={props.experimental} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getTipoBlock(props)}
          nombreform="tipoblock"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={TipoBlockList} />
    </>
  )
}

export default TablaTipoBlock