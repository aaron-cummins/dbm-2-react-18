import React, { useEffect, useContext } from "react";
import { VistasContext } from "../context/vistasContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "components";

const TablaVistas = () => {
  const { vistasList, obtenerVistas, obtenerVistaslist } =
    useContext(VistasContext);
  const { mensaje } = useStateContext();
  const getVistas = (props) => obtenerVistas(props);

  useEffect(() => {
    obtenerVistaslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Accion", selector: (row) => row.accion, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getVistas(props)}
          nombreform="vistas"
        />
      ),
    },
  ];

  return (
    <>
      <div>
        {mensaje.mensaje ? (
          <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
        ) : null}

        <Tabla columns={columns} data={vistasList} />
      </div>
    </>
  );
};

export default TablaVistas;
