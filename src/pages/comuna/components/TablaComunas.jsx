import React, { useEffect, useContext } from "react";
import { ComunaContext } from "../context/comunaContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { SelectsContext } from "../../../contexts/SelectsContext";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaComunas = () => {
  const { comunaList, obtenerComunas, obtenerComuna } =
    useContext(ComunaContext);
  const { mensaje } = useStateContext();
  const { obtenerRegiones } = useContext(SelectsContext);
  const getComuna = (props) => obtenerComuna(props);

  useEffect(() => {
    obtenerComunas();
    obtenerRegiones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Región", selector: (row) => row.region.nombre, sortable: true },
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
          FnEditar={() => getComuna(props)}
          nombreform="comuna"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={comunaList} />
    </>
  );
};

export default TablaComunas;
