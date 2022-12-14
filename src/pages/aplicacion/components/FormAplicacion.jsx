import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { AplicacionContext } from "../context/aplicacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormAplicacion = () => {
  const { registrarAplicacion, aplicacionActual, actualizarAplicacion, obtenerAplicacion } =
    useContext(AplicacionContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const aplicacionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [aplicacion, setAplicacion] = useState(aplicacionDefault);

  useEffect(() => {
    aplicacionActual !== null ? setAplicacion(aplicacionActual) : setAplicacion(aplicacionDefault);
  }, [aplicacionActual, aplicacionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setAplicacion({
          ...aplicacion,
          [e.target.name]: e.target.checked,
        })
      : setAplicacion({
          ...aplicacion,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setAplicacion(aplicacionDefault);
    obtenerAplicacion(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (aplicacion.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    aplicacionActual !== null ? actualizarAplicacion(AplicacionAEnviar()) : registrarAplicacion(AplicacionAEnviar());

    limpiaForm();
    closeModal();
  };

  const AplicacionAEnviar = () => {
    let aplicacionTmp = { ...aplicacion };
    return aplicacionTmp;
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
            value={aplicacion.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={aplicacion.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAplicacion;
