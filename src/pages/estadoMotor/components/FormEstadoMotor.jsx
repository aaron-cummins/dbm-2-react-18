import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, Switch } from "components";
import { EstadoMotorContext } from "../context/EstadoMotorContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormEstadoMotor = () => {
  const { EstadoMotorActual, registrarEstadoMotor, actualizarEstadoMotor, obtenerEstadoMotor } =
    useContext(EstadoMotorContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();

  const EstadoMotorDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
      montaje: false,
    }),
    []
  );
  const [EstadoMotor, setEstadoMotor] = useState(EstadoMotorDefault);

  useEffect(() => {
    EstadoMotorActual ? setEstadoMotor(EstadoMotorActual) : setEstadoMotor(EstadoMotorDefault);
  }, [EstadoMotorActual, EstadoMotorDefault]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    type === "checkbox"
      ? setEstadoMotor({ ...EstadoMotor, [name]: checked })
      : setEstadoMotor({ ...EstadoMotor, [name]: value });
  };

  const limpiaForm = () => {
    setEstadoMotor(EstadoMotorDefault);
    obtenerEstadoMotor(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    EstadoMotorActual ? actualizarEstadoMotor(EstadoMotorEnviar()) : registrarEstadoMotor(EstadoMotorEnviar());
    limpiaForm();
    closeModal();
  };

  const EstadoMotorEnviar = () => {
    let EstadoMotorTmp = { ...EstadoMotor };
    return EstadoMotorTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={EstadoMotor.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Switch
            label="montaje"
            id="montaje"
            name="montaje"
            onChange={handleChange}
            checked={EstadoMotor.montaje}></Switch>
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={EstadoMotor.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoMotor;
