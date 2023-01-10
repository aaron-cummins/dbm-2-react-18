import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
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
  const [error, setError] = useState({});

  useEffect(() => {
    aplicacionActual !== null ? setAplicacion(aplicacionActual) : setAplicacion(aplicacionDefault);
  }, [aplicacionActual, aplicacionDefault]);

  const validaciones = () => {
    let error = {};
    if (!aplicacion.nombre.trim()) error.nombre = "Nombre Requerido";

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox"
      ? setAplicacion({ ...aplicacion, [name]: checked })
      : setAplicacion({ ...aplicacion, [name]: value });

    setError(validaciones());
  };

  const limpiaForm = () => {
    setAplicacion(aplicacionDefault);
    obtenerAplicacion(null);
    setError({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(validaciones(aplicacion));

    if (Object.keys(error).length === 0) {
      aplicacionActual !== null ? actualizarAplicacion(AplicacionAEnviar()) : registrarAplicacion(AplicacionAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AplicacionAEnviar = () => {
    let aplicacionTmp = { ...aplicacion };
    return aplicacionTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={aplicacion.nombre}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.nombre}
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
