import React, { useEffect, useContext } from "react";
import { UsuarioContext } from "../context/usuarioContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Alerts, OpcionesTabla, Tabla } from "../../../components";
import { SelectsContext } from "../../../contexts/SelectsContext";

const TablaUsuario = () => {
  const { usuarioList, obtenerUsuariolist, obtenerUsuario } =
    useContext(UsuarioContext);
  const { mensaje } = useStateContext();
  const { obtenerCargos } = useContext(SelectsContext);

  const getUsuario = (props) => obtenerUsuario(props);

  useEffect(() => {
    obtenerUsuariolist();
    obtenerCargos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre",
      selector: (row) => row.nombres + " " + row.apellidos,
      sortable: true,
    },
    { name: "Rut", selector: (row) => row.rut },
    { name: "Uid", selector: (row) => row.uid },
    { name: "Correo", selector: (row) => row.correo },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getUsuario(props)}
          nombreform="usuario"
        />
      ),
    },
  ];

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={usuarioList} />
    </>
  );
};

export default TablaUsuario;
