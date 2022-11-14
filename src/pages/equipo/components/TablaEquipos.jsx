import React, { useEffect, useContext } from "react";
import { EquipoContext } from "../context/equipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { Alerts, ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaEquipos = () => {
  const { equipoList, obtenerEquipos, obtenerEquipo } =
    useContext(EquipoContext);
  const { mensaje } = useStateContext();
  const getEquipo = (props) => obtenerEquipo(props);

  const { obtenerAplicacionOems, obtenerOems } = useContext(SelectsContext);

  useEffect(() => {
    obtenerEquipos();
    obtenerAplicacionOems();
    obtenerOems();
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
          FnEditar={() => getEquipo(props)}
          nombreform="equipo"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={equipoList} />
    </>
  );
};

export default TablaEquipos;
