import { EemmContext } from "../../context/eemmContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { closeModal } from "utilities/Utiles";
import {
  Buttons,
  Checkbox,
  InputText,
  SelectEstadoEquipo,
  SelectEstadoEquipoInstalacion,
  SelectEstadoMotor,
  SelectEstadoMotorInstalacion,
  SelectTipoContrato,
} from "components";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormMontaje = (lugarTrabajoId, flotaLugarTrabajoId, unidadId, esnId) => {
  const { obtenerEemm, registrarEemm, actualizarEemm, eemmActual } = useContext(EemmContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const montajeDefault = useMemo(
    () => ({
      id: 0,
      lugarTrabajoId: lugarTrabajoId,
      flotaLugarTrabajoId: flotaLugarTrabajoId,
      flotaLugarTrabajo: {
        id: flotaLugarTrabajoId,
      },
      unidadId: unidadId,
      unidad: {
        id: unidadId,
      },
      estadoEquipoId: 0,
      estadoEquipo: {
        id: 0,
      },
      estadoMotorId: 0,
      estadoMotor: {
        id: 0,
      },
      estadoEquipoInstalacionId: 0,
      estadoEquipoInstalacion: {
        id: 0,
      },
      estadoMotorInstalacionId: 0,
      estadoMotorInstalacion: {
        id: 0,
      },
      contratoId: 0,
      contrato: {
        id: 0,
      },
      hrEquipoInstalacion: 0.0,
      hrMotorInstalacion: 0.0,
      intervencionId: 0,
      intervencion: {
        id: 0,
      },
      esnId: esnId,
      esn: {
        id: esnId,
      },
      esnPlaca: "",
      usuarioId: 0,
      usuario: {
        id: 0,
      },
      aprobadorId: 0,
      aprobador: {
        id: 0,
      },
      amId: 0,
      am: {
        id: 0,
      },
      axial: 0.0,
      fechaps: Date.now,
      activo: false,
    }),
    [lugarTrabajoId, flotaLugarTrabajoId, unidadId, esnId]
  );

  const [montaje, setMontaje] = useState(montajeDefault);

  useEffect(() => {
    eemmActual !== null ? setMontaje(eemmActual) : setMontaje(montajeDefault);
  }, [eemmActual, montajeDefault]);

  const handleChange = () => {};

  const limpiaForm = () => {
    setMontaje(montajeDefault);
    obtenerEemm(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    eemmActual !== null ? actualizarEemm(MontajeAEnviar()) : registrarEemm(MontajeAEnviar());
    limpiaForm();
    closeModal();
  };

  const MontajeAEnviar = () => {
    let montajeTmp = { ...montaje };
    return montajeTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaps"
            name="fechaps"
            placeholder="Fecha PS"
            label="Fecha puesta en servicio"
            value={montaje.fechaps}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrEquipoInstalacion"
            name="hrEquipoInstalacion"
            placeholder="Hrs Equipo en instalación"
            label="Horas Equipo en instalación"
            value={montaje.hrEquipoInstalacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrMotorInstalacion"
            name="hrMotorInstalacion"
            placeholder="Hrs Motor en instalación"
            label="Horas Motor en instalación"
            value={montaje.hrMotorInstalacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="axial"
            name="axial"
            placeholder="Medición axial (mm)"
            label="Medición axial (mm)"
            value={montaje.axial}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <SelectEstadoEquipoInstalacion
            id="estadoEquipoInstalacionId"
            name="estadoEquipoInstalacionId"
            placeholder="Estado Equipo instalación"
            label="Estado Equipo instalación"
            value={montaje.estadoEquipoInstalacion.id}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-group mb-4">
          <SelectEstadoMotorInstalacion
            id="estadoMotorInstalacionId"
            name="estadoMotorInstalacionId"
            placeholder="Estado Motor instalación"
            label="Estado Motor instalación"
            value={montaje.estadoMotorInstalacion.id}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-group mb-4">
          <SelectEstadoEquipo
            id="estadoEquipoId"
            name="estadoEquipoId"
            placeholder="Estado Equipo"
            label="Estado Equipo"
            value={montaje.estadoEquipo.id}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-group mb-4">
          <SelectEstadoMotor
            id="estadoMotorId"
            name="estadoMotorId"
            placeholder="Estado Motor"
            label="Estado Motor"
            value={montaje.estadoMotor.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-4">
          <SelectTipoContrato
            id="contratoId"
            name="contratoId"
            placeholder="contrato"
            label="Contrato"
            value={montaje.contrato.id}
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            id="intervencionId"
            name="intervencionId"
            placeholder="Correlativo Intervención"
            label="Correlativo Intervención"
            value={montaje.intervencionId}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={montaje.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMontaje;
