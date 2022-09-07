import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { PaisContext } from "../context/paisContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormPais = () => {
  const { registrarPais, paisActual, actualizarPais, obtenerPais } = useContext(PaisContext);
  const { mensaje } = useStateContext();
  const paisDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [pais, setPais] = useState(paisDefault);

  useEffect(() => {
    paisActual ? setPais(paisActual) : setPais(paisDefault);
  }, [paisActual, paisDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setPais({
          ...pais,
          [e.target.name]: e.target.checked,
        })
      : setPais({
          ...pais,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setPais(paisDefault);
    obtenerPais(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    paisActual ? actualizarPais(PaisAEnviar()) : registrarPais(PaisAEnviar());
    limpiaForm();
    closeModal();
  };

  const PaisAEnviar = () => {
    let paisTmp = { ...pais };
    return paisTmp;
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
            value={pais.nombre}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviacion"
            label="Abreviacion"
            value={pais.abreviacion}
            onChangeFN={handleChange}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={pais.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPais;
