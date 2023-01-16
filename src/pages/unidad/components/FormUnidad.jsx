import React, { useEffect, useMemo, useState } from "react";
import { InputText, Buttons, Checkbox, Select } from "components";
import { UnidadContext } from "../context/unidadContext";
import { closeModal, formatDateshort } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";

const FormUnidad = () => {
  const { registrarUnidad, unidadActual, actualizarUnidad, obtenerUnidad } = useContext(UnidadContext);
  const { mensaje } = useStateContext();
  const {
    obtenerFlotasLugarTrabajo,
    aplicacionOemsList,
    lugarTrabajoUsuarioList,
    oemsList,
    versionEquiposList,
    flotasLugarTrabajoList,
  } = useContext(SelectsContext);
  const { enqueueSnackbar } = useSnackbar();

  const unidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      lugarTrabajoId: 0,
      flotaLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
      },
      oemId: 0,
      oem: {
        id: 0,
      },
      aplicacionOemId: 0,
      aplicacionOem: {
        id: 0,
      },
      nserieEquipo: "",
      modelo: "",
      versionId: 0,
      version: {
        id: 0,
      },
      conversionUnidadId: 0,
      fechaActivacion: "",
      fechaDesactivacion: "",
      usuarioId: 0,
      activo: false,
    };
  }, []);

  const [unidad, setUnidad] = useState(unidadDefault);
  //const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (unidadActual !== null) {
      setUnidad(unidadActual);
      obtenerFlotasLugarTrabajo(unidadActual.flotaLugarTrabajo.lugarTrabajo?.id);
    } else setUnidad(unidadDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unidadActual, unidadDefault]);

  const handleChange = (e) => {
    if (e.target.name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(e.target.value);
      setUnidad({ ...unidad, [e.target.name]: e.target.value });
    }

    e.target.name === "activo"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "flotaLugarTrabajoId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          flotaLugarTrabajo: {
            id: e.target.value,
          },
        })
      : e.target.name === "oemId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          oem: {
            id: e.target.value,
          },
        })
      : e.target.name === "aplicacionOemId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          aplicacionOem: {
            id: e.target.value,
          },
        })
      : e.target.name === "versionId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          version: {
            id: e.target.value,
          },
        })
      : setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setUnidad(unidadDefault);
    obtenerUnidad(null);
    closeModal();
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (unidad.lugarTrabajoId === 0) {
      enqueueSnackbar("Debe seleccionar un Lugar de trabajo", { variant: "error" });
      return false;
    }
    if (unidad.flotaLugarTrabajoId === 0) {
      enqueueSnackbar("Debe seleccionar una flota", { variant: "error" });
      return;
    }
    if (unidad.aplicacionOemId === 0) {
      enqueueSnackbar("Debe seleccionar un aplicación", { variant: "error" });
      return;
    }
    if (unidad.oemId === 0) {
      enqueueSnackbar("Debe seleccionar un Oem", { variant: "error" });
      return;
    }
    if (unidad.versionId === 0) {
      enqueueSnackbar("Debe seleccionar una version de equipo", { variant: "error" });
      return;
    }
    unidadActual !== null ? actualizarUnidad(UnidadAEnviar()) : registrarUnidad(UnidadAEnviar());
    enqueueSnackbar("Unidad Guardada exitosamente.", { variant: "success" });
    limpiaForm();
  };

  const UnidadAEnviar = () => {
    let unidadTmp = { ...unidad };
    unidadTmp.flotaLugarTrabajoId = unidad.flotaLugarTrabajo.id;
    unidadTmp.oemId = unidad.oem.id;
    unidadTmp.aplicacionOemId = unidad.aplicacionOem.id;
    unidadTmp.versionId = unidad.version.id;
    unidadTmp.usuarioId = 1;
    return unidadTmp;
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-2">
            <Select
              id="lugarTrabajoId"
              name="lugarTrabajoId"
              placeholder="Lugar Trabajo"
              label="Lugar trabajo"
              list={lugarTrabajoUsuarioList}
              value={unidad.flotaLugarTrabajo.lugarTrabajo?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-2">
            <Select
              id="flotaLugarTrabajoId"
              name="flotaLugarTrabajoId"
              placeholder="Flota"
              label="Flota"
              list={flotasLugarTrabajoList}
              value={unidad.flotaLugarTrabajo?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <InputText
              id="nombre"
              name="nombre"
              label="Nombre unidad"
              placeholder="Nombre"
              value={unidad.nombre}
              onChangeFN={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              id="nserieEquipo"
              name="nserieEquipo"
              placeholder="A012345"
              label="Número de serie"
              value={unidad.nserieEquipo}
              onChangeFN={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              id="modelo"
              name="modelo"
              placeholder="930-E4"
              label="Modelo"
              value={unidad.modelo}
              onChangeFN={handleChange}
              required={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <Select
              id="aplicacionOemId"
              name="aplicacionOemId"
              label="Aplicación OEM"
              list={aplicacionOemsList}
              value={unidad.aplicacionOem?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <Select
              id="oemId"
              name="oemId"
              label="OEM"
              list={oemsList}
              value={unidad.oem?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <Select
              id="versionId"
              name="versionId"
              placeholder="Versión Equipo"
              label="Versión Equipo"
              list={versionEquiposList}
              value={unidad.version.id}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="form-group mb-4">
            <InputText
              type="date"
              id="fechaActivacion"
              name="fechaActivacion"
              placeholder="Fecha Activación"
              label="Fecha Activación"
              value={unidad.fechaActivacion ? formatDateshort(unidad.fechaActivacion) : ""}
              onChangeFN={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <InputText
              type="date"
              id="fechaDesactivacion"
              name="fechaDesactivacion"
              placeholder="Fecha Desactivación"
              label="Fecha Desactivación"
              value={unidad.fechaDesactivacion ? formatDateshort(unidad.fechaDesactivacion) : ""}
              onChangeFN={handleChange}
            />
          </div>
          <div className="form-group mb-4">
            <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={unidad.activo} />
          </div>
        </div>
        <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
          <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </form>
    </>
  );
};

export default FormUnidad;
