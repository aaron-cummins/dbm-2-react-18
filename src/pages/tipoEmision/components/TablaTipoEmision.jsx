import React, { useEffect, useContext } from "react";
import { TipoEmisionContext } from "../context/tipoemisionContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaTipoEmision = () => {
  const { tipoemisionList, obtenerTipoEmisiones, obtenerTipoEmision } =
    useContext(TipoEmisionContext);
  const { mensaje } = useStateContext();

  const getTipoEmision = (props) => obtenerTipoEmision(props);

  useEffect(() => {
    obtenerTipoEmisiones();
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
          FnEditar={() => getTipoEmision(props)}
          nombreform="tipoemision"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={tipoemisionList} />
    </>
  );
};

export default TablaTipoEmision;
