import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { TipoAdmisionContext } from "../context/tipoadmisionContext";
import { closeModal } from "../../../utilities/Utiles";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormTipoAdmision = () => {
  const {
    registrarTipoAdmision,
    tipoadmisionActual,
    actualizarTipoAdmision,
    obtenerTipoAdmision,
  } = useContext(TipoAdmisionContext);
  const { mensaje, alerta } = useStateContext();
  const tipoadmisionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoadmision, setTipoAdmision] = useState(tipoadmisionDefault);

  useEffect(() => {
    tipoadmisionActual
      ? setTipoAdmision(tipoadmisionActual)
      : setTipoAdmision(tipoadmisionDefault);
  }, [tipoadmisionActual, tipoadmisionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipoAdmision({
          ...tipoadmision,
          [e.target.name]: e.target.checked,
        })
      : setTipoAdmision({
          ...tipoadmision,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipoAdmision(tipoadmisionDefault);
    obtenerTipoAdmision(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipoadmision.nombre === "") {
      alerta("danger", "Debe ingresar un nombre valido");
      return false;
    }

    tipoadmisionActual
      ? actualizarTipoAdmision(TipoAdmisionAEnviar())
      : registrarTipoAdmision(TipoAdmisionAEnviar());
    limpiaForm();
    closeModal();
  };

  const TipoAdmisionAEnviar = () => {
    let tipoadmisionTmp = { ...tipoadmision };
    return tipoadmisionTmp;
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
            value={tipoadmision.nombre}
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
            checked={tipoadmision.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoAdmision;
