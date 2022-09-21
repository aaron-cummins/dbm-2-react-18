import React, { useEffect, useContext } from "react";
import { TipoFiltradoContext } from "../context/tipofiltradoContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaTipoFiltrado = () => {
  const { tipofiltradoList, obtenerTipoFiltrados, obtenerTipoFiltrado } =
    useContext(TipoFiltradoContext);
  const { mensaje } = useStateContext();

  const getTipoFiltrado = (props) => obtenerTipoFiltrado(props);

  useEffect(() => {
    obtenerTipoFiltrados();
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
          FnEditar={() => getTipoFiltrado(props)}
          nombreform="tipofiltrado"
        />
      ),
    },
  ];
  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={tipofiltradoList} />
    </>
  );
};

export default TablaTipoFiltrado;
