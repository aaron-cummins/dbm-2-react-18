import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { TipoContratoContext } from "../context/TipoContratoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";


const FormTipoContrato = () => {
  const {
    TipoContratoActual,
    registrarTipoContrato,
    actualizarTipoContrato,
    obtenerTipoContrato,
  } = useContext(TipoContratoContext);
  const { mensaje } = useStateContext();

  const TipoContratoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false 
    }),
    []
  );
  const [TipoContrato, setTipoContrato] = useState(TipoContratoDefault);

  useEffect(() => {
    TipoContratoActual
      ? setTipoContrato(TipoContratoActual)
      : setTipoContrato(TipoContratoDefault);
}, [TipoContratoActual, TipoContratoDefault]);

const handleChange = (e) => {
  e.target.name === "activo"
    ? setTipoContrato({
        ...TipoContrato,
        [e.target.name]: e.target.checked,
      })
    : setTipoContrato({
        ...TipoContrato,
        [e.target.name]: e.target.value,
      });
};

const limpiaForm = () => {
  setTipoContrato(TipoContratoDefault);
  obtenerTipoContrato(null);
};

const handleOnSubmit = (e) => {
  e.preventDefault();

  TipoContratoActual
    ? actualizarTipoContrato(TipoContratoEnviar())
    : registrarTipoContrato(TipoContratoEnviar());
  limpiaForm();
  closeModal();
};

const TipoContratoEnviar = () => {
  let TipoContratoTmp = { ...TipoContrato };
  return TipoContratoTmp;
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
          value={TipoContrato.nombre}
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
          checked={TipoContrato.activo}
        />
      </div>
    </div>
    <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
      <Buttons cancelFN={() => limpiaForm()} />
    </div>
  </form>
);
}

export default FormTipoContrato