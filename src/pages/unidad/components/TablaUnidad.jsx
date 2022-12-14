import React, { useEffect, useContext } from "react";
import { UnidadContext } from "../context/unidadContext";
import { useStateContext } from "contexts/ContextProvider";
import { Alerts, ColActivoTabla, Header, OpcionesTabla, Tabla } from "components";
import { SelectsContext } from "contexts/SelectsContext";
import { useNavigate } from "react-router-dom";

const TablaUnidad = () => {
  const { unidadList, obtenerUnidadlist, obtenerUnidad } = useContext(UnidadContext);
  const { mensaje, currentColor } = useStateContext();
  const { obtenerFlotas, obtenerVersionEquipos, obtenerLugaresTrabajo, obtenerAplicacionOems, obtenerOems } =
    useContext(SelectsContext);
  const navigate = useNavigate();

  const getUnidad = (props) => {
    obtenerUnidad(props);
    navigate(`editar/${props.id}`);
  };

  useEffect(() => {
    obtenerUnidadlist();
    obtenerLugaresTrabajo();
    obtenerVersionEquipos();
    obtenerFlotas();
    obtenerAplicacionOems();
    obtenerOems();

    //return Snackbar().success("Hola");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    {
      name: "L. trabajo",
      selector: (row) => row.lugarTrabajo?.nombre,
      sortable: true,
    },
    {
      name: "Flota",
      selector: (row) => row.flotas?.nombre,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Modelo",
      selector: (row) => row.modelo,
      sortable: true,
    },
    { name: "N Serie", selector: (row) => row.nserieEquipo },
    {
      name: "Oem",
      selector: (row) => row.oem?.nombre,
      sortable: true,
    },
    {
      name: "Aplicación",
      selector: (row) => row.aplicacionOem?.nombre,
      sortable: true,
    },
    {
      name: "Activo",
      cell: (row) => <ColActivoTabla activo={row.activo} />,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (props) => <OpcionesTabla editarNoModal={true} FnEditar={() => getUnidad(props)} />,
    },
  ];

  return (
    <>
      <Header category="Administración" title="Unidad">
        <button
          type="button"
          //data-bs-toggle="modal"
          //data-bs-target="#unidad-modal"
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
          }}
          onClick={() => navigate("crear")}
          className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}>
          Nueva Unidad
        </button>
      </Header>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <Tabla columns={columns} data={unidadList} />
    </>
  );
};

export default TablaUnidad;
