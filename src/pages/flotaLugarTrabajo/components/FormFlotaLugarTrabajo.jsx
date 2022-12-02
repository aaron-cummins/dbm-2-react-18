import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Alerts,
  Buttons,
  Checkbox,
  SelectLugarTrabajo,
  SelectFlota,
} from "components";
import { FlotaLugarTrabajoContext } from "../context/flotaLugarTrabajoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormFlotaLugarTrabajo = () => {
  const {
    registrarFlotaLugarTrabajo,
    flotaLugarTrabajoActual,
    actualizarFlotaLugarTrabajo,
    obtenerFlotaLugarTrabajo,
  } = useContext(FlotaLugarTrabajoContext);

  const { mensaje } = useStateContext();
  const flotaLugarTrabajoDefault = useMemo(
    () => ({
      id: 0,
      flotasId: 0,
      lugarTrabajoId: 0,
      activo: false,
    }),
    []
  );

  const [flotaLugarTrabajo, setFlotaLugarTrabajo] = useState(
    flotaLugarTrabajoDefault
  );

  useEffect(() => {
    flotaLugarTrabajoActual !== null
      ? setFlotaLugarTrabajo(flotaLugarTrabajoActual)
      : setFlotaLugarTrabajo(flotaLugarTrabajoDefault);
  }, [flotaLugarTrabajoActual, flotaLugarTrabajoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setFlotaLugarTrabajo({
          ...flotaLugarTrabajo,
          [e.target.name]: e.target.checked,
        })
      : setFlotaLugarTrabajo({
          ...flotaLugarTrabajo,
          [e.target.name]: e.target.value,
        });

    console.log(flotaLugarTrabajo);
  };

  const limpiaForm = () => {
    setFlotaLugarTrabajo(flotaLugarTrabajoDefault);
    obtenerFlotaLugarTrabajo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    flotaLugarTrabajoActual !== null
      ? actualizarFlotaLugarTrabajo(FlotaAEnviar())
      : registrarFlotaLugarTrabajo(FlotaAEnviar());
    limpiaForm();
    closeModal();
  };

  const FlotaAEnviar = () => {
    let flotaTmp = { ...flotaLugarTrabajo };
    return flotaTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <SelectFlota
            id="flotasId"
            name="flotasId"
            placeholder="Flota"
            value={flotaLugarTrabajo.flotasId}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <SelectLugarTrabajo
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            value={flotaLugarTrabajo.lugarTrabajoId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={flotaLugarTrabajo.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormFlotaLugarTrabajo;
