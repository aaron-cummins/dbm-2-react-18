import React, { useEffect, useContext } from "react";
import { VistasGroupContext } from "../context/vistasGroupContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "../../../components";
import { SelectsContext } from "../../../contexts/SelectsContext";

const TablaVistasGroup = () => {
  const { vistasgroupList, obtenerVistasGrouplist, obtenerVistasGroup } =
    useContext(VistasGroupContext);

  const { obtenerModulos } = useContext(SelectsContext);
  const { mensaje } = useStateContext();

  const getVistasGroup = (props) => obtenerVistasGroup(props);

  useEffect(() => {
    obtenerVistasGrouplist();
    obtenerModulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Modulo (id)", selector: (row) => row.id_modulo, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getVistasGroup(props)}
          nombreform="vistasgroup"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla data={vistasgroupList} columns={columns} />
    </>
  );
};

export default TablaVistasGroup;
