import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { MonitoreoMotorContext } from "../context/monitoreoMotorContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormMonitoreoMotor = () => {
  const { registrarMonitoreoMotor, monitoreomotorActual, actualizarMonitoreoMotor, obtenerMonitoreoMotor } =
    useContext(MonitoreoMotorContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const monitoreomotorDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [monitoreomotor, setMonitoreoMotor] = useState(monitoreomotorDefault);

  useEffect(() => {
    monitoreomotorActual !== null ? setMonitoreoMotor(monitoreomotorActual) : setMonitoreoMotor(monitoreomotorDefault);
  }, [monitoreomotorActual, monitoreomotorDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setMonitoreoMotor({
          ...monitoreomotor,
          [e.target.name]: e.target.checked,
        })
      : setMonitoreoMotor({
          ...monitoreomotor,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setMonitoreoMotor(monitoreomotorDefault);
    obtenerMonitoreoMotor(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (monitoreomotor.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    monitoreomotorActual !== null
      ? actualizarMonitoreoMotor(MonitoreoMotorAEnviar())
      : registrarMonitoreoMotor(MonitoreoMotorAEnviar());

    limpiaForm();
    closeModal();
  };

  const MonitoreoMotorAEnviar = () => {
    let monitoreomotorTmp = { ...monitoreomotor };
    return monitoreomotorTmp;
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
            value={monitoreomotor.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            onChangeFN={handleChange}
            checked={monitoreomotor.activo}
            label="Activo"
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMonitoreoMotor;
