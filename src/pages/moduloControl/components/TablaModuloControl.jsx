import React, { useEffect, useContext } from "react";
import { ModuloControlContext } from "../context/moduloControlContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaModuloControl = () => {
  const { modulocontrolList, obtenerModulosControl, obtenerModuloControl } =
    useContext(ModuloControlContext);
  const { mensaje } = useStateContext();

  const getModuloControl = (props) => obtenerModuloControl(props);

  useEffect(() => {
    obtenerModulosControl();
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
          FnEditar={() => getModuloControl(props)}
          nombreform="modulocontrol"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={modulocontrolList} />
    </>
  );
};

export default TablaModuloControl;
