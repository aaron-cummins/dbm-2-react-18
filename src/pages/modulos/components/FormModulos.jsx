import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons } from "components";
import { ModulosContext } from "../context/modulosContext";
import { closeModal, formatDate } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormModulos = () => {
  const { registrarModulos, modulosActual, actualizarModulos, obtenerModulos } =
    useContext(ModulosContext);
  const { mensaje } = useStateContext();
  const modulosDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      controller: "",
      grupos: [],
      icono: "",
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
    }),
    []
  );

  const [modulos, setModulos] = useState(modulosDefault);

  useEffect(() => {
    modulosActual ? setModulos(modulosActual) : setModulos(modulosDefault);
  }, [modulosActual, modulosDefault]);

  const handleChange = (e) => {
    setModulos({
      ...modulos,
      [e.target.name]: e.target.value,
    });
  };

  const limpiaForm = () => {
    setModulos(modulosDefault);
    obtenerModulos(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    modulosActual
      ? actualizarModulos(ModulosAEnviar())
      : registrarModulos(ModulosAEnviar());
    limpiaForm();
    closeModal();
  };

  const ModulosAEnviar = () => {
    let modulosTmp = { ...modulos };
    modulosTmp.grupos && delete modulosTmp.grupos;
    modulosTmp.grupos = [];
    modulosTmp.updated_at = formatDate(Date(Date.now));
    return modulosTmp;
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
            value={modulos.nombre}
            onChangeFN={handleChange}
            required
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="controller"
            name="controller"
            placeholder="Controller"
            label="Controller"
            value={modulos.controller}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="icono"
            name="icono"
            placeholder="<icono/>"
            label="Icono"
            value={modulos.icono}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormModulos;
