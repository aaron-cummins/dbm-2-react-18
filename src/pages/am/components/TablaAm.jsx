import React, { useEffect, useContext } from "react";
import { AmContext } from "../context/amContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";

const TablaAm = () => {
  const { amList, obtenerAmes, obtenerAm } = useContext(AmContext);

  const getAm = (props) => obtenerAm(props);

  useEffect(() => {
    obtenerAmes();
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
      cell: (props) => <OpcionesTabla editar={true} FnEditar={() => getAm(props)} nombreform="am" />,
    },
  ];

  return <Tabla columns={columns} data={amList} />;
};

export default TablaAm;
