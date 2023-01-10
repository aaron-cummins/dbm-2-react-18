import React, { useContext, useEffect, useMemo, useState } from "react";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import {
  Buttons,
  Checkbox,
  InputText,
  SelectTipoContrato,
  SelectMonitoreoFiltro,
  SelectMonitoreoMotor,
  SelectLugarTrabajo,
  SelectFlotaLugarTrabajo,
} from "components";
import { closeModal, formatDate, formatDateshort } from "utilities/Utiles";
import { SelectsContext } from "contexts/SelectsContext";
import { ContratoContext } from "../context/contratoContext";

const FormContrato = () => {
  const { mensaje } = useStateContext();
  const { obtenerFlotasLugarTrabajo } = useContext(SelectsContext);
  const { enqueueSnackbar } = useSnackbar();
  const { obtenerContrato, contratoActual, registrarContrato, actualizarContrato } = useContext(ContratoContext);

  const contatoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      tipoContratoId: 0,
      tipoContrato: {
        id: 0,
      },
      lt: 0,
      flotasLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
        lugarTrabajo: {
          id: 0,
        },
      },
      fechaInicio: formatDate(Date(Date.now)),
      duracion: 0,
      fechaCobro: formatDate(Date(Date.now)),
      accesoPool: false,
      monitoreoMotorId: 0,
      monitoreoMotor: {
        id: 0,
      },
      monitoreoFiltroId: 0,
      monitoreoFiltro: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [contrato, setContrato] = useState(contatoDefault);

  useEffect(() => {
    if (contratoActual) {
      setContrato(contratoActual);
      obtenerFlotasLugarTrabajo(contratoActual.flotaLugarTrabajo?.id);
    } else setContrato(contatoDefault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contratoActual, contatoDefault]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    contratoActual ? actualizarContrato(contratoAEnviar()) : registrarContrato(contratoAEnviar());
    limpiaForm();
    closeModal();
  };

  const handleChange = (e) => {
    if (e.target.name === "lt") {
      obtenerFlotasLugarTrabajo(e.target.value);
      setContrato({ ...contrato, [e.target.name]: e.target.value });
    }

    e.target.name === "activo"
      ? setContrato({
          ...contrato,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "tipoContratoId"
      ? setContrato({
          ...contrato,
          [e.target.name]: e.target.value,
          tipoContrato: {
            id: e.target.value,
          },
        })
      : e.target.name === "flotasLugarTrabajoId"
      ? setContrato({
          ...contrato,
          [e.target.name]: e.target.value,
          flotasLugarTrabajo: {
            id: e.target.value,
          },
        })
      : e.target.name === "monitoreoMotorId"
      ? setContrato({
          ...contrato,
          [e.target.name]: e.target.value,
          monitoreoMotor: {
            id: e.target.value,
          },
        })
      : e.target.name === "monitoreoFiltroId"
      ? setContrato({
          ...contrato,
          [e.target.name]: e.target.value,
          monitoreoFiltro: {
            id: e.target.value,
          },
        })
      : setContrato({
          ...contrato,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    obtenerContrato(null);
    setContrato(contatoDefault);
    closeModal();
  };

  const contratoAEnviar = () => {
    let contratoTmp = { ...contrato };
    contratoTmp.tipoContratoId = contrato.tipoContrato.id;
    contratoTmp.flotasLugarTrabajoId = contrato.flotaLugarTrabajo.id;
    contratoTmp.monitoreoFiltroId = contrato.monitoreoFiltro.id;
    contratoTmp.monitoreoMotorId = contrato.monitoreoMotor.id;

    return contratoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={contrato.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-2">
          <SelectTipoContrato
            id="tipoContratoId"
            name="tipoContratoId"
            placeholder="tipo Contrato"
            value={contrato.tipoContrato?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <SelectLugarTrabajo
            id="lt"
            name="lt"
            placeholder="Lugar trabajo"
            value={contrato.flotaLugarTrabajo.lugarTrabajo?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-2">
          <SelectFlotaLugarTrabajo
            id="flotasLugarTrabajoId"
            name="flotasLugarTrabajoId"
            placeholder="flotas Lugar Trabajo"
            value={contrato.flotaLugarTrabajo?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            placeholder="Fecha Inicio"
            label="Fecha Inicio"
            value={contrato.fechaInicio ? formatDateshort(contrato.fechaInicio) : ""}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="duracion"
            name="duracion"
            placeholder="Duración"
            label="Duración"
            value={contrato.duracion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            type="date"
            id="fechaCobro"
            name="fechaCobro"
            placeholder="Fecha Cobro"
            label="Fecha Cobro"
            value={contrato.fechaCobro ? formatDateshort(contrato.fechaCobro) : ""}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-2">
          <Checkbox
            id="accesoPool"
            name="accesoPool"
            label="Acceso Pool"
            onChangeFN={handleChange}
            checked={contrato.accesoPool}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <SelectMonitoreoFiltro
            id="monitoreoFiltroId"
            name="monitoreoFiltroId"
            placeholder="monitoreo Filtro"
            label="Monitoreo Filtro"
            value={contrato.monitoreoFiltro?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-2">
          <SelectMonitoreoMotor
            id="monitoreoMotorId"
            name="monitoreoMotorId"
            placeholder="Monitoreo Motor"
            value={contrato.monitoreoMotor?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={contrato.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormContrato;
