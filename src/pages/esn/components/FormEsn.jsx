import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, SelectVersionMotor } from "components";
import { EsnContext } from "../context/esnContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";
import useValidacionForm from "hooks/useValidacionForm";

const FormEsn = () => {
  const { registrarEsn, esnActual, actualizarEsn, obtenerEsn } = useContext(EsnContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const esnDefault = useMemo(() => {
    return {
      id: 0,
      esn: "",
      esnPlaca: "",
      usuarioId: 0,
      usuario: {
        id: 0,
      },
      versionMotorId: 0,
      versionMotor: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [esn, setEsn] = useState(esnDefault);
  const [error, setError] = useState({});
  const { validarTexto, validarSelect } = useValidacionForm();

  useEffect(() => {
    esnActual !== null ? setEsn(esnActual) : setEsn(esnDefault);
  }, [esnActual, esnDefault]);

  const validaciones = () => {
    let error = {};
    if (validarTexto(esn.esn)) error.esn = "Debe ingresar un ESN";
    if (validarTexto(esn.esnPlaca)) error.esnPlaca = "Debe ingresar un ESN Placa";
    if (validarSelect(esn.versionMotor)) error.versionMotorId = "Debe Seleccionar una versión de motor";

    setError(error);
    return error;
  };

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    if (type === "checkbox") setEsn({ ...esn, [name]: checked });
    else if (name === "versionMotorId") setEsn({ ...esn, versionMotor: { id: value }, [name]: value });
    else setEsn({ ...esn, [name]: value });
  };

  const limpiaForm = () => {
    setEsn(esnDefault);
    obtenerEsn(null);
    setError({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const validado = validaciones();
    if (Object.keys(validado).length === 0) {
      esnActual !== null ? actualizarEsn(EsnAEnviar()) : registrarEsn(EsnAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const EsnAEnviar = () => {
    let esnTmp = { ...esn };
    esnTmp.versionMotorId = esn.versionMotor.id;
    esnTmp.usuarioId = 1;
    return esnTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="esn"
            name="esn"
            placeholder="ESN"
            label="ESN"
            value={esn.esn}
            onChangeFN={handleChange}
            required={true}
            error={error.esn}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="esnPlaca"
            name="esnPlaca"
            placeholder="ESN Placa"
            label="ESN placa"
            value={esn.esnPlaca}
            onChangeFN={handleChange}
            required={true}
            error={error.esnPlaca}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectVersionMotor
            id="versionMotorId"
            name="versionMotorId"
            placeholder="versionMotorId"
            label="version Motor"
            value={esn.versionMotor.id}
            onChange={handleChange}
            required={true}
            error={error.versionMotorId}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={esn.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEsn;
