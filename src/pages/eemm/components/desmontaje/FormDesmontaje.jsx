import { EemmContext } from "../../context/eemmContext";
import React, { useContext, useEffect } from "react";
import { closeModal } from "utilities/Utiles";
import { Buttons, Checkbox, InputText, Select } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";
import { SelectsContext } from "contexts/SelectsContext";
import useValidacionForm from "hooks/useValidacionForm";

const FormDesmontaje = () => {
  const { obtenerEemm, registrarEemm, actualizarEemm, eemmActual, eemm, setEemm, eemmDefault } =
    useContext(EemmContext);
  const { validarTexto, validarSelect, validarNumero, error, setError } = useValidacionForm();
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const {
    amList,
    estadoEquipoInstalacionList,
    estadoMotorInstalacionList,
    estadoEquipoList,
    estadoMotorList,
    tipoContratoList,
    motivoCambioList,
    tipoSalidaList,
  } = useContext(SelectsContext);

  useEffect(() => {
    eemmActual !== null ? setEemm(eemmActual) : setEemm(eemm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eemmActual, eemm]);

  const validaciones = () => {
    let valida = true;

    if (validarTexto("fechaps", eemm.fechaps, "Debe seleccionar una fecha de puesta en servicio")) valida = false;
    if (validarNumero("hrEquipoInstalacion", eemm.hrEquipoInstalacion, "Debe ingresar horas validas")) valida = false;
    if (validarNumero("hrMotorInstalacion", eemm.hrMotorInstalacion, "Debe ingresar las horas de instalación"))
      valida = false;
    if (validarNumero("axial", eemm.axial, "Debe ingresar una medición axial (mm)")) valida = false;
    if (validarSelect("estadoEquipoInstalacionId", eemm.estadoEquipoInstalacion, "Debe seleccionar un estado"))
      valida = false;
    if (validarSelect("estadoMotorInstalacionId", eemm.estadoMotorInstalacion, "Debe seleccionar un estado"))
      valida = false;
    if (validarSelect("estadoEquipoId", eemm.estadoEquipo, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("estadoMotorId", eemm.estadoMotor, "Debe seleccionar un estado")) valida = false;
    if (validarSelect("contratoId", eemm.contrato, "Debe seleccionar un contrato")) valida = false;
    if (validarNumero("intervencionId", eemm.intervencionId, "Debe ingresar un numero de intevención")) valida = false;
    if (validarSelect("amId", eemm.am, "Debe seleccionar un am")) valida = false;

    return valida;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") setEemm({ ...eemm, [name]: checked });
    else if (name === "estadoEquipoId") setEemm({ ...eemm, estadoEquipo: { id: value }, [name]: value });
    else if (name === "estadoMotorId") setEemm({ ...eemm, estadoMotor: { id: value }, [name]: value });
    else if (name === "estadoEquipoInstalacionId")
      setEemm({ ...eemm, estadoEquipoInstalacion: { id: value }, [name]: value });
    else if (name === "estadoMotorInstalacionId")
      setEemm({ ...eemm, estadoMotorInstalacion: { id: value }, [name]: value });
    else if (name === "contratoId") setEemm({ ...eemm, contrato: { id: value }, [name]: value });
    else if (name === "esnId") setEemm({ ...eemm, esn: { id: value }, [name]: value });
    else setEemm({ ...eemm, [name]: value });

    if (type === "select-one") validarNumero(name, value);
    else validarTexto(name, value);
  };

  const limpiaForm = () => {
    setEemm(eemmDefault);
    obtenerEemm(null);
    setError([]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (validaciones()) {
      eemmActual !== null ? actualizarEemm(DesmontajeAEnviar()) : registrarEemm(DesmontajeAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const DesmontajeAEnviar = () => {
    let desmontajeTmp = { ...eemm };

    desmontajeTmp.estadoEquipoInstalacionId = eemm.estadoEquipoInstalacion.id;
    desmontajeTmp.estadoMotorInstalacionId = eemm.estadoMotorInstalacion.id;
    desmontajeTmp.estadoEquipoId = eemm.estadoEquipo.id;
    desmontajeTmp.estadoMotorId = eemm.estadoMotor.id;
    desmontajeTmp.contratoId = eemm.contrato.id;
    desmontajeTmp.am = eemm.am.id;

    return desmontajeTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            id="esnId"
            name="esnId"
            placeholder="ESN [Placa]"
            label="ESN [Placa]"
            value={eemm?.esnId}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.esnId}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaps"
            name="fechaps"
            placeholder="Fecha PS"
            label="Fecha puesta en servicio"
            value={eemm?.fechaps}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.fechaps}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaFalla"
            name="fechaFalla"
            placeholder="Fecha falla o detención"
            label="Fecha falla o detención"
            value={eemm?.fechaFalla}
            onChangeFN={handleChange}
            required={true}
            error={error.fechaFalla}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrOperadaMotor"
            name="hrOperadaMotor"
            placeholder="Hrs Operadas Motor"
            label="Horas operadas Motor"
            value={eemm?.hrOperadaMotor}
            onChangeFN={handleChange}
            required={true}
            error={error.hrOperadaMotor}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            id="hrMotorInstalacion"
            name="hrMotorInstalacion"
            placeholder="Hrs Motor en instalación"
            label="Horas Motor en instalación"
            value={eemm?.hrMotorInstalacion}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.hrMotorInstalacion}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="hrAcumuladasMotor"
            name="hrAcumuladasMotor"
            placeholder="Hrs acumuladas motor"
            label="Horas acumuladas motor"
            value={eemm?.hrAcumuladasMotor}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.hrAcumuladasMotor}
          />
        </div>
        <div className="form-group mb-4">
          <Select
            id="estadoEquipoId"
            name="estadoEquipoId"
            placeholder="Estado Equipo"
            label="Estado Equipo"
            list={estadoEquipoList}
            value={eemm.estadoEquipo?.id}
            onChange={handleChange}
            required={true}
            error={error.estadoEquipoId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="estadoMotorId"
            name="estadoMotorId"
            placeholder="Estado Motor"
            label="Estado Motor"
            list={estadoMotorList}
            value={eemm.estadoMotor?.id}
            onChange={handleChange}
            required={true}
            error={error.estadoMotorId}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <InputText
            id="hrHistoricoMotor"
            name="hrHistoricoMotor"
            placeholder="Hrs histoóricas motor"
            label="Horas históricas motor"
            value={eemm?.hrHistoricoMotor}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.hrHistoricoMotor}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            id="hrHistoricoEquipo"
            name="hrHistoricoEquipo"
            placeholder="Hrs históricas equipo"
            label="Horas históricas equipo"
            value={eemm?.hrHistoricoEquipo}
            onChangeFN={handleChange}
            required={true}
            readOnly={true}
            error={error.hrHistoricoEquipo}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="motivoCambioId"
            name="motivoCambioId"
            placeholder="motivo Cambio"
            label="Motivo Cambio"
            list={motivoCambioList}
            value={eemm.motivoCambio?.id}
            onChange={handleChange}
            required={true}
            error={error.motivoCambioId}
          />
        </div>

        <div className="form-group mb-4">
          <Select
            id="tipoSalidaId"
            name="tipoSalidaId"
            placeholder="tipo salida"
            label="Tipo de salida"
            list={tipoSalidaList}
            value={eemm.tipoSalida?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoSalidaId}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="form-group mb-4">
          <Select
            id="contratoId"
            name="contratoId"
            placeholder="contrato"
            label="Contrato"
            list={tipoContratoList}
            value={eemm.contrato?.id}
            onChange={handleChange}
            required={true}
            readOnly={true}
            error={error.contratoId}
          />
        </div>
        <div className="form-group mb-4"></div>
        <div className="form-group mb-4">
          <InputText
            id="adId"
            name="adId"
            placeholder="Aviso desmontaje"
            label="Aviso desmontaje"
            value={eemm.ad?.id}
            onChangeFN={handleChange}
            required={true}
            error={error.adId}
          />
        </div>

        <div className="form-group mb-4">
          <InputText
            type="date"
            id="fechaAd"
            name="fechaAd"
            placeholder="Fecha aviso desmontaje"
            label="Fecha aviso desmontaje"
            value={eemm.fechaAd}
            onChangeFN={handleChange}
            required={true}
            error={error.fechaAd}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons NoModal={true} cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormDesmontaje;
