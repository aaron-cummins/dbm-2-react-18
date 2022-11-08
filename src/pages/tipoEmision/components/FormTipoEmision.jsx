import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { TipoEmisionContext } from "../context/tipoemisionContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormTipoEmision = () => {
  const {
    registrarTipoEmision,
    tipoemisionActual,
    actualizarTipoEmision,
    obtenerTipoEmision,
  } = useContext(TipoEmisionContext);
  const { mensaje, alerta } = useStateContext();
  const tipoemisionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoemision, setTipoEmision] = useState(tipoemisionDefault);

  useEffect(() => {
    tipoemisionActual
      ? setTipoEmision(tipoemisionActual)
      : setTipoEmision(tipoemisionDefault);
  }, [tipoemisionActual, tipoemisionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipoEmision({
          ...tipoemision,
          [e.target.name]: e.target.checked,
        })
      : setTipoEmision({
          ...tipoemision,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipoEmision(tipoemisionDefault);
    obtenerTipoEmision(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipoemision.nombre === "") {
      alerta("danger", "Debe ingresar un nombre valido");
      return false;
    }

    tipoemisionActual
      ? actualizarTipoEmision(TipoEmisionAEnviar())
      : registrarTipoEmision(TipoEmisionAEnviar());

    limpiaForm();
    closeModal();
  };

  const TipoEmisionAEnviar = () => {
    let tipoemisionTmp = { ...tipoemision };
    return tipoemisionTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={tipoemision.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={tipoemision.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoEmision;
