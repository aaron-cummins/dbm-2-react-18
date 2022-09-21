import React, { useEffect, useContext } from "react";
import { TipoCombustibleContext } from "../context/tipocombustibleContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaTipoCombustible = () => {
  const {
    tipocombustibleList,
    obtenerTipoCombustibles,
    obtenerTipoCombustible,
  } = useContext(TipoCombustibleContext);
  const { mensaje } = useStateContext();

  const getTipoCombustible = (props) => obtenerTipoCombustible(props);

  useEffect(() => {
    obtenerTipoCombustibles();
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
          FnEditar={() => getTipoCombustible(props)}
          nombreform="tipocombustible"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={tipocombustibleList} />
    </>
  );
};

export default TablaTipoCombustible;
