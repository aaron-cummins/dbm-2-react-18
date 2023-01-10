import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EsnContext } from "../context/esnContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

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

  useEffect(() => {
    esnActual !== null ? setEsn(esnActual) : setEsn(esnDefault);
  }, [esnActual, esnDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setEsn({
          ...esn,
          [e.target.name]: e.target.checked,
        })
      : setEsn({
          ...esn,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setEsn(esnDefault);
    obtenerEsn(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    esnActual !== null ? actualizarEsn(EsnAEnviar()) : registrarEsn(EsnAEnviar());

    limpiaForm();
    closeModal();
  };

  const EsnAEnviar = () => {
    let esnTmp = { ...esn };
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
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="versionMotorId"
            name="versionMotorId"
            placeholder="versionMotorId"
            label="version Motor"
            value={esn.versionMotorId}
            onChangeFN={handleChange}
            required={true}
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
