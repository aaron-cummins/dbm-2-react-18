import React, { useEffect, useContext } from "react";
import { TipoAdmisionContext } from "../context/tipoadmisionContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaTipoAdmision = () => {
  const { tipoadmisionList, obtenerTipoAdmisiones, obtenerTipoAdmision } =
    useContext(TipoAdmisionContext);
  const { mensaje } = useStateContext();

  const getTipoAdmision = (props) => obtenerTipoAdmision(props);

  useEffect(() => {
    obtenerTipoAdmisiones();
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
          FnEditar={() => getTipoAdmision(props)}
          nombreform="tipoadmision"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={tipoadmisionList} />
    </>
  );
};

export default TablaTipoAdmision;
