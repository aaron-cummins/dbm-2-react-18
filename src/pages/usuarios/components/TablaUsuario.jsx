import React, { useEffect, useContext } from "react";
import { UsuarioContext } from "../context/usuarioContext";
import { ColActivoTabla, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { useNavigate } from "react-router-dom";

const TablaUsuario = () => {
  const { usuarioList, obtenerUsuariolist, obtenerUsuario, obtenerPermisosUsuariolist } = useContext(UsuarioContext);
  const { obtenerCargos, obtenerRol } = useContext(SelectsContext);

  const navigate = useNavigate();

  const getUsuario = (props) => obtenerUsuario(props);
  const getUsuarioPermisos = (props) => {
    obtenerPermisosUsuariolist(props.id);
    obtenerUsuario(props);
    let ruta = `permisosusuario/${props.id}`;
    navigate(ruta);
  };

  useEffect(() => {
    obtenerUsuariolist();
    obtenerCargos();
    obtenerRol();
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
    { name: "Cargo", selector: (row) => row.cargo.nombre },
    { name: "Correo", selector: (row) => row.correo },
    {
      name: "Activo",
      cell: (props) => <ColActivoTabla activo={props.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => (
        <>
          <OpcionesTabla editar={true} FnEditar={() => getUsuario(props)} nombreform="usuario" />
          <OpcionesTabla info={true} tooltip="Permisos" FnInfo={() => getUsuarioPermisos(props)} nombreform="usuario" />
        </>
      ),
    },
  ];

  return <Tabla columns={columns} data={usuarioList} />;
};

export default TablaUsuario;
