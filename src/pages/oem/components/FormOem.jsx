import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { OemContext } from "../context/oemContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormOem = () => {
  const { registrarOem, oemActual, actualizarOem, obtenerOem } =
    useContext(OemContext);
  const { mensaje } = useStateContext();
  const oemDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      activo: false,
    };
  }, []);

  const [oem, setOem] = useState(oemDefault);

  useEffect(() => {
    oemActual ? setOem(oemActual) : setOem(oemDefault);
  }, [oemActual, oemDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setOem({
          ...oem,
          [e.target.name]: e.target.checked,
        })
      : setOem({
          ...oem,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setOem(oemDefault);
    obtenerOem(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    oemActual !== null
      ? actualizarOem(OemAEnviar())
      : registrarOem(OemAEnviar());
    limpiaForm();
    closeModal();
  };

  const OemAEnviar = () => {
    let oemTmp = { ...oem };
    return oemTmp;
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
            value={oem.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviacion"
            label="Abreviacion"
            value={oem.abreviacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={oem.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormOem;
