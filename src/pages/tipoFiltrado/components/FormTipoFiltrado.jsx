import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { TipoFiltradoContext } from "../context/tipofiltradoContext";
import { closeModal } from "../../../utilities/Utiles";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormTipoFiltrado = () => {
  const {
    registrarTipoFiltrado,
    tipofiltradoActual,
    actualizarTipoFiltrado,
    obtenerTipoFiltrado,
  } = useContext(TipoFiltradoContext);
  const { mensaje, alerta } = useStateContext();
  const tipofiltradoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipofiltrado, setTipoFiltrado] = useState(tipofiltradoDefault);

  useEffect(() => {
    tipofiltradoActual
      ? setTipoFiltrado(tipofiltradoActual)
      : setTipoFiltrado(tipofiltradoDefault);
  }, [tipofiltradoActual, tipofiltradoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipoFiltrado({
          ...tipofiltrado,
          [e.target.name]: e.target.checked,
        })
      : setTipoFiltrado({
          ...tipofiltrado,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipoFiltrado(tipofiltradoDefault);
    obtenerTipoFiltrado(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipofiltrado.nombre === "") {
      alerta("danger", "Debe ingresar un nombre valido");
      return false;
    }

    tipofiltradoActual
      ? actualizarTipoFiltrado(TipoFiltradoAEnviar())
      : registrarTipoFiltrado(TipoFiltradoAEnviar());

    limpiaForm();
    closeModal();
  };

  const TipoFiltradoAEnviar = () => {
    let tipofiltradoTmp = { ...tipofiltrado };
    return tipofiltradoTmp;
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
            value={tipofiltrado.nombre}
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
            checked={tipofiltrado.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoFiltrado;
