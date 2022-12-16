import React, { useEffect, useMemo, useState } from "react";
import {
  InputText,
  Buttons,
  Checkbox,
  SelectLugarTrabajo,
  SelectFlota,
  SelectVersionEquipo,
  SelectAplicacionOem,
  SelectOem,
} from "components";
import { UnidadContext } from "../context/unidadContext";
import { closeModal, formatDateshort } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useContext } from "react";
import { useSnackbar } from "notistack";

const FormUnidad = () => {
  const { registrarUnidad, unidadActual, actualizarUnidad, obtenerUnidad } = useContext(UnidadContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const unidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      flotasId: 0,
      flotas: {
        id: 0,
      },
      lugarTrabajoId: 0,
      lugarTrabajo: {
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
    unidadActual !== null ? setUnidad(unidadActual) : setUnidad(unidadDefault);
  }, [unidadActual, unidadDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "flotasId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          flotas: {
            id: e.target.value,
          },
        })
      : e.target.name === "lugarTrabajoId"
      ? setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
          lugarTrabajo: {
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
    if (unidad.flotasId === 0) {
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
    unidadTmp.flotasId = unidad.flotas.id;
    unidadTmp.lugarTrabajoId = unidad.lugarTrabajo.id;
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
          <div className="form-group mb-6">
            <SelectLugarTrabajo
              id="lugarTrabajoId"
              name="lugarTrabajoId"
              placeholder="Lugar Trabajo"
              value={unidad.lugarTrabajo?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-6">
            <SelectFlota
              id="flotasId"
              name="flotasId"
              placeholder="Flota"
              value={unidad.flotas?.id}
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
            <SelectAplicacionOem
              id="aplicacionOemId"
              name="aplicacionOemId"
              value={unidad.aplicacionOem?.id}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="form-group mb-4">
            <SelectOem id="oemId" name="oemId" value={unidad.oem?.id} onChange={handleChange} required={true} />
          </div>
          <div className="form-group mb-4">
            <SelectVersionEquipo
              id="versionId"
              name="versionId"
              placeholder="Versión Equipo"
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
