import React, { useEffect, useContext } from "react";
import { RolesContext } from "../context/rolesContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "components";

const TablaRoles = () => {
  const { rolesList, obtenerRoleslist, obtenerRoles } =
    useContext(RolesContext);
  const { mensaje } = useStateContext();

  const getRoles = (props) => obtenerRoles(props);

  useEffect(() => {
    obtenerRoleslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getRoles(props)}
          nombreform="roles"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={rolesList} />
    </>
  );
};

export default TablaRoles;
