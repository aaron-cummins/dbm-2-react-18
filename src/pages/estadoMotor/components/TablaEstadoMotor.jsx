import React, { useEffect, useContext } from "react";
import { EstadoMotorContext } from "../context/EstadoMotorContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEstadoMotor = () => {
  const { EstadoMotorList, obtenerEstadoMotor, obtenerEstadoMotores } =
  useContext(EstadoMotorContext);
  const { mensaje } = useStateContext();

  const getEstadoMotor = (props) => {
    obtenerEstadoMotor(props);
  };

  useEffect(() => {
    obtenerEstadoMotores();
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
          FnEditar={() => getEstadoMotor(props)}
          nombreform="estadomotor"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={EstadoMotorList} />
    </>
  );
}

export default TablaEstadoMotor