import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { ModuloControlContext } from "../context/moduloControlContext";
import { closeModal } from "../../../utilities/Utiles";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormModuloControl = () => {
  const {
    registrarModuloControl,
    modulocontrolActual,
    actualizarModuloControl,
    obtenerModuloControl,
  } = useContext(ModuloControlContext);
  const { mensaje } = useStateContext();
  const modulocontrolDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [modulocontrol, setModuloControl] = useState(modulocontrolDefault);

  useEffect(() => {
    modulocontrolActual !== null
      ? setModuloControl(modulocontrolActual)
      : setModuloControl(modulocontrolDefault);
  }, [modulocontrolActual, modulocontrolDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setModuloControl({
          ...modulocontrol,
          [e.target.name]: e.target.checked,
        })
      : setModuloControl({
          ...modulocontrol,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setModuloControl(modulocontrolDefault);
    obtenerModuloControl(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    modulocontrolActual
      ? actualizarModuloControl(ModuloControlAEnviar())
      : registrarModuloControl(ModuloControlAEnviar());
    limpiaForm();
    closeModal();
  };

  const ModuloControlAEnviar = () => {
    let modulocontrolTmp = { ...modulocontrol };
    return modulocontrolTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={modulocontrol.nombre}
            onChangeFN={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={modulocontrol.activo}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormModuloControl;
