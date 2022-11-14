import React, { useEffect, useContext } from "react";
import { AplicacionContext } from "../context/aplicacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaAplicacion = () => {
  const { aplicacionList, obtenerAplicaciones, obtenerAplicacion } =
    useContext(AplicacionContext);
  const { mensaje } = useStateContext();

  const getAplicacion = (props) => obtenerAplicacion(props);

  useEffect(() => {
    obtenerAplicaciones();
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
          FnEditar={() => getAplicacion(props)}
          nombreform="aplicacion"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={aplicacionList} />
    </>
  );
};

export default TablaAplicacion;
