import React, { useEffect, useContext } from "react";
import { MotorContext } from "../context/motorContext";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaMotors = () => {
  const { motorList, obtenerMotors, obtenerMotor } = useContext(MotorContext);
  const { mensaje } = useStateContext();
  const { obtenerAplicaciones } = useContext(SelectsContext);
  const getMotor = (props) => obtenerMotor(props);

  useEffect(() => {
    obtenerMotors();
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
          FnEditar={() => getMotor(props)}
          nombreform="motor"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={motorList} />
    </>
  );
};

export default TablaMotors;
