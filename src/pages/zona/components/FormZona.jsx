import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { ZonaContext } from "../context/zonaContext";
import { closeModal } from "utilities/Utiles";
import { SelectPais } from "components";
import { useStateContext } from "contexts/ContextProvider";

const FormZona = () => {
  const { registrarZona, zonaActual, actualizarZona, obtenerZona } =
    useContext(ZonaContext);
  const { mensaje } = useStateContext();
  const zonaDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      pais: 0,
      activo: false,
    };
  }, []);

  const [zona, setZona] = useState(zonaDefault);

  useEffect(() => {
    zonaActual ? setZona(zonaActual) : setZona(zonaDefault);
  }, [zonaActual, zonaDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setZona({
          ...zona,
          [e.target.name]: e.target.checked,
        })
      : setZona({
          ...zona,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setZona(zonaDefault);
    obtenerZona(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    zonaActual ? actualizarZona(ZonaAEnviar()) : registrarZona(ZonaAEnviar());

    limpiaForm();
    closeModal();
  };

  const ZonaAEnviar = () => {
    let zonaTmp = { ...zona };
    return zonaTmp;
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
            value={zona.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <SelectPais
            id="pais"
            name="pais"
            value={zona.pais}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="form-group gap-4">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={zona.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormZona;
