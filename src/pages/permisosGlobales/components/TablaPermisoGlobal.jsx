import React, { useEffect, useContext } from "react";
import { PermisosGlobalesContext } from "../context/permisosGlobalesContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { SelectsContext } from "../../../contexts/SelectsContext";
import {
  Alerts,
  ColActivoTabla,
  OpcionesTabla,
  Tabla,
} from "../../../components";

const TablaPermisoGlobal = () => {
  const { permisoGlobalList, obtenerPermisosGlobales, obtenerPermisoGlobal } =
    useContext(PermisosGlobalesContext);

  const { obtenerModulos, obtenerRol } = useContext(SelectsContext);
  const { mensaje } = useStateContext();

  const getPermisoGlobal = (props) => {
    obtenerPermisoGlobal(props);
  };

  useEffect(() => {
    obtenerPermisosGlobales();
    obtenerModulos();
    obtenerRol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Rol", selector: (row) => row.rolId, sortable: true },
    { name: "Módulo", selector: (row) => row.moduloId, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getPermisoGlobal(props)}
          nombreform="PermisoGlobal"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={permisoGlobalList} />
    </>
  );
};

export default TablaPermisoGlobal;
