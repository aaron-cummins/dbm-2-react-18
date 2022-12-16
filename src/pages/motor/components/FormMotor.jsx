import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, SelectAplicacion } from "components";
import { MotorContext } from "../context/motorContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormMotor = () => {
  const { registrarMotor, motorActual, actualizarMotor, obtenerMotor } = useContext(MotorContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const motorDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      rangoPotencia: "",
      aplicacionId: 0,
      activo: false,
    }),
    []
  );

  const [motor, setMotor] = useState(motorDefault);

  useEffect(() => {
    motorActual !== null ? setMotor(motorActual) : setMotor(motorDefault);
  }, [motorActual, motorDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setMotor({
          ...motor,
          [e.target.name]: e.target.checked,
        })
      : setMotor({
          ...motor,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setMotor(motorDefault);
    obtenerMotor(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    motorActual !== null ? actualizarMotor(MotorAEnviar()) : registrarMotor(MotorAEnviar());
    limpiaForm();
    closeModal();
  };

  const MotorAEnviar = () => {
    let motorTmp = { ...motor };
    return motorTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={motor.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <SelectAplicacion
            id="aplicacionId"
            name="aplicacionId"
            value={motor.aplicacionId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="rangoPotencia"
            name="rangoPotencia"
            placeholder="Rango de potencia"
            label="Rango de potencia"
            value={motor.rangoPotencia}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={motor.activo} />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center"></div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMotor;
