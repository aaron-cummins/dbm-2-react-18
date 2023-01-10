import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  InputText,
  Buttons,
  Checkbox,
  SelectMotor,
  SelectTipoAdmision,
  SelectTipoEmision,
  SelectTipoBlock,
  SelectTipoCombustible,
  SelectTipoFiltrado,
  SelectTipoInyeccion,
  SelectModuloControl,
  SelectPostTratamiento,
} from "components";
import { VersionMotorContext } from "../context/versionMotorContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormVersionMotor = () => {
  const { registrarVersionMotor, versionmotorActual, actualizarVersionMotor, obtenerVersionMotor } =
    useContext(VersionMotorContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const versionmotorDefault = useMemo(() => {
    return {
      id: 0,
      nombreComercial: "",
      nombreServicio: "",
      ecmquantum: false,
      ecmcence: false,
      motorId: 0,
      motor: {
        id: 0,
      },
      tipoAdmisionId: 0,
      tipoAdmision: {
        id: 0,
      },
      tipoBlockId: 0,
      tipoBlock: {
        id: 0,
      },
      moduloControlId: 0,
      moduloControl: {
        id: 0,
      },
      tipoCombustibleId: 0,
      tipoCombustible: {
        id: 0,
      },
      tipoEmisionId: 0,
      tipoEmision: {
        id: 0,
      },
      tipoFiltradoId: 0,
      tipoFiltrado: {
        id: 0,
      },
      tipoInyeccionId: 0,
      tipoInyeccion: {
        id: 0,
      },
      postTratamientoId: 0,
      posttratamiento: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [versionmotor, setVersionMotor] = useState(versionmotorDefault);
  const [error, setError] = useState({});
  const { validarTexto, validarSelect } = useValidacionForm();

  useEffect(() => {
    versionmotorActual !== null ? setVersionMotor(versionmotorActual) : setVersionMotor(versionmotorDefault);
  }, [versionmotorActual, versionmotorDefault]);

  const validaciones = () => {
    let error = {};

    if (validarTexto(versionmotor.nombreComercial)) error.nombreComercial = "Nombre comercial requerido";
    if (validarTexto(versionmotor.nombreServicio)) error.nombreServicio = "Nombre de Servicio requerido";
    if (validarSelect(versionmotor.motor)) error.motorId = "Debe seleccionar un motor";
    if (validarSelect(versionmotor.tipoAdmision)) error.tipoAdmisionId = "Debe seleccionar un Tipo de Admisión";
    if (validarSelect(versionmotor.tipoBlock)) error.tipoBlockId = "Debe seleccionar un Tipo de Block";
    if (validarSelect(versionmotor.moduloControl)) error.moduloControlId = "Debe seleccionar un módulo de control";
    if (validarSelect(versionmotor.tipoCombustible))
      error.tipoCombustibleId = "Debe seleccionar un tipo de combustible";
    if (validarSelect(versionmotor.tipoEmision)) error.tipoEmisionId = "Debe seleccionar un tipo de emisión";
    if (validarSelect(versionmotor.tipoFiltrado)) error.tipoFiltradoId = "Debe seleccionar un tipo de filtrado";
    if (validarSelect(versionmotor.tipoInyeccion)) error.tipoInyeccionId = "Debe seleccionar un tipo de Inyección";
    if (validarSelect(versionmotor.posttratamiento)) error.postTratamientoId = "Debe seleccionar un Post Tratamiento";
    setError(error);
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") setVersionMotor({ ...versionmotor, [name]: checked });
    else if (name === "motorId") setVersionMotor({ ...versionmotor, motor: { id: value }, [name]: value });
    else if (name === "tipoAdmisionId") setVersionMotor({ ...versionmotor, tipoAdmision: { id: value } });
    else if (name === "tipoEmisionId") setVersionMotor({ ...versionmotor, tipoEmision: { id: value } });
    else if (name === "tipoBlockId") setVersionMotor({ ...versionmotor, tipoBlock: { id: value } });
    else if (name === "tipoCombustibleId") setVersionMotor({ ...versionmotor, tipoCombustible: { id: value } });
    else if (name === "tipoFiltradoId") setVersionMotor({ ...versionmotor, tipoFiltrado: { id: value } });
    else if (name === "moduloControlId") setVersionMotor({ ...versionmotor, moduloControl: { id: value } });
    else if (name === "tipoInyeccionId") setVersionMotor({ ...versionmotor, tipoInyeccion: { id: value } });
    else if (name === "postTratamientoId") setVersionMotor({ ...versionmotor, posttratamiento: { id: value } });
    else setVersionMotor({ ...versionmotor, [name]: value });
  };

  const limpiaForm = () => {
    setVersionMotor(versionmotorDefault);
    obtenerVersionMotor(null);
    setError({});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const validado = validaciones();
    if (Object.keys(validado).length === 0) {
      versionmotorActual !== null
        ? actualizarVersionMotor(VersionMotorAEnviar())
        : registrarVersionMotor(VersionMotorAEnviar());

      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const VersionMotorAEnviar = () => {
    let versionmotorTmp = { ...versionmotor };
    versionmotorTmp.moduloControlId = versionmotor.moduloControl.id;
    versionmotorTmp.motorId = versionmotor.motor.id;
    versionmotorTmp.postTratamientoId = versionmotor.posttratamiento.id;
    versionmotorTmp.tipoAdmisionId = versionmotor.tipoAdmision.id;
    versionmotorTmp.tipoBlockId = versionmotor.tipoBlock.id;
    versionmotorTmp.tipoCombustibleId = versionmotor.tipoCombustible.id;
    versionmotorTmp.tipoEmisionId = versionmotor.tipoEmision.id;
    versionmotorTmp.tipoFiltradoId = versionmotor.tipoFiltrado.id;
    versionmotorTmp.tipoInyeccionId = versionmotor.tipoInyeccion.id;
    versionmotorTmp.ecmcence = versionmotor.ecmcence;
    versionmotorTmp.ecmquantum = versionmotor.ecmquantum;
    return versionmotorTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-2">
          <InputText
            id="nombreComercial"
            name="nombreComercial"
            placeholder="Nombre Comercial"
            label="Nombre Comercial"
            value={versionmotor.nombreComercial}
            onChangeFN={handleChange}
            required={true}
            error={error.nombreComercial}
          />
        </div>
        <div className="form-group mb-2">
          <InputText
            id="nombreServicio"
            name="nombreServicio"
            placeholder="Nombre Servicio"
            label="Nombre Servicio"
            value={versionmotor.nombreServicio}
            onChangeFN={handleChange}
            required={true}
            error={error.nombreServicio}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-2">
          <SelectMotor
            id="motorId"
            name="motorId"
            placeholder="Motor"
            label="Motor"
            value={versionmotor.motor?.id}
            onChange={handleChange}
            required={true}
            error={error.motorId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectTipoAdmision
            id="tipoAdmisionId"
            name="tipoAdmisionId"
            placeholder="tipo Admisión"
            label="Tipo Admisión"
            value={versionmotor.tipoAdmision?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoAdmisionId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectTipoEmision
            id="tipoEmisionId"
            name="tipoEmisionId"
            placeholder="Tipo Emisión"
            label="Tipo Emisión"
            value={versionmotor.tipoEmision?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoEmisionId}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-2">
          <SelectTipoBlock
            id="tipoBlockId"
            name="tipoBlockId"
            placeholder="Tipo Block"
            label="Tipo Block"
            value={versionmotor.tipoBlock?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoBlockId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectTipoCombustible
            id="tipoCombustibleId"
            name="tipoCombustibleId"
            placeholder="Tipo Combustible"
            label="Tipo Combustible"
            value={versionmotor.tipoCombustible?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoCombustibleId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectTipoFiltrado
            id="tipoFiltradoId"
            name="tipoFiltradoId"
            placeholder="Tipo Filtrado"
            label="Tipo Filtrado"
            value={versionmotor.tipoFiltrado?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoFiltradoId}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-2">
          <SelectTipoInyeccion
            id="tipoInyeccionId"
            name="tipoInyeccionId"
            placeholder="Tipo Inyección"
            label="Tipo Inyección"
            value={versionmotor.tipoInyeccion?.id}
            onChange={handleChange}
            required={true}
            error={error.tipoInyeccionId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectModuloControl
            id="moduloControlId"
            name="moduloControlId"
            placeholder="Modulo Control"
            label="Modulo Control"
            value={versionmotor.moduloControl?.id}
            onChange={handleChange}
            required={true}
            error={error.moduloControlId}
          />
        </div>
        <div className="form-group mb-2">
          <SelectPostTratamiento
            id="postTratamientoId"
            name="postTratamientoId"
            placeholder="Post Tratamiento"
            label="Post Tratamiento"
            value={versionmotor.posttratamiento?.id}
            onChange={handleChange}
            required={true}
            error={error.postTratamientoId}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-4">
          <Checkbox
            id="ecmquantum"
            name="ecmquantum"
            onChangeFN={handleChange}
            checked={versionmotor.ecmquantum}
            label="ECM quantum"
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="ecmcence"
            name="ecmcence"
            onChangeFN={handleChange}
            checked={versionmotor.ecmcence}
            label="ECM cence"
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={versionmotor.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVersionMotor;