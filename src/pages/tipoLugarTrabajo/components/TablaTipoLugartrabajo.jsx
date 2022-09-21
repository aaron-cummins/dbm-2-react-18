import React, { useEffect, useContext } from "react";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "../../../components";

const TablaTipolugarTrabajo = () => {
  const {
    tipolugartrabajoList,
    obtenerTipolugartrabajoList,
    obtenerTipolugartrabajo,
  } = useContext(TipolugartrabajoContext);
  const { mensaje } = useStateContext();

  const getTipolugartrabajo = (props) => obtenerTipolugartrabajo(props);

  useEffect(() => {
    obtenerTipolugartrabajoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Tipo", selector: (row) => row.tipo, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getTipolugartrabajo(props)}
          nombreform="tipolugartrabajo"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={tipolugartrabajoList} />
    </>
  );
};

export default TablaTipolugarTrabajo;
