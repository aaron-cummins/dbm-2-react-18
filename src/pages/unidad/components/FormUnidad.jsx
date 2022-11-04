import React, { useEffect, useMemo, useState } from "react";
import {
  Alerts,
  InputText,
  Buttons,
  Checkbox,
  SelectLugarTrabajo,
  SelectFlota,
  SelectVersionEquipo,
} from "../../../components";
import { UnidadContext } from "../context/unidadContext";
import { closeModal, formatDateshort } from "../../../utilities/Utiles";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useContext } from "react";

const FormUnidad = () => {
  const { registrarUnidad, unidadActual, actualizarUnidad, obtenerUnidad } =
    useContext(UnidadContext);
  const { mensaje } = useStateContext();

  const unidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      nserieUnidad: "",
      fechaActivacion: "",
      fechaDesactivacion: "",
      lugarTrabajoId: 0,
      flotasId: 0,
      versionEquipo: 0,
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
      : setUnidad({
          ...unidad,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setUnidad(unidadDefault);
    obtenerUnidad(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    unidadActual !== null
      ? actualizarUnidad(UnidadAEnviar())
      : registrarUnidad(UnidadAEnviar());
    limpiaForm();
    closeModal();
  };

  const UnidadAEnviar = () => {
    let unidadTmp = { ...unidad };
    return unidadTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="nombre"
            name="nombre"
            label="Nombre"
            placeholder="Nombre"
            value={unidad.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="nserieUnidad"
            name="nserieUnidad"
            placeholder="Número de serie"
            label="Número de serie"
            value={unidad.nserieUnidad}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            type="date"
            id="fechaActivacion"
            name="fechaActivacion"
            placeholder="Fecha Activación"
            label="Fecha Activación"
            value={
              unidad.fechaActivacion
                ? formatDateshort(unidad.fechaActivacion)
                : ""
            }
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            type="date"
            id="fechaDesactivacion"
            name="fechaDesactivacion"
            placeholder="Fecha Desactivación"
            label="Fecha Desactivación"
            value={
              unidad.fechaDesactivacion
                ? formatDateshort(unidad.fechaDesactivacion)
                : ""
            }
            onChangeFN={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectLugarTrabajo
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            value={unidad.lugarTrabajoId}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectFlota
            id="flotasId"
            name="flotasId"
            placeholder="Flota"
            value={unidad.flotasId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectVersionEquipo
            id="versionEquipo"
            name="versionEquipo"
            placeholder="Versión Equipo"
            value={unidad.versionEquipo}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={unidad.activo}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormUnidad;
