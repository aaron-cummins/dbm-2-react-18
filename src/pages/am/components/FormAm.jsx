import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AmContext } from "../context/amContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormAm = () => {
  const { registrarAm, amActual, actualizarAm, obtenerAm } = useContext(AmContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const amDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [am, setAm] = useState(amDefault);
  const [error, setError] = useState({});

  useEffect(() => {
    amActual !== null ? setAm(amActual) : setAm(amDefault);
  }, [amActual, amDefault]);

  const validaciones = () => {
    let error = {};
    if (!am.nombre.trim()) error.nombre = "Nombre Requerido";

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    type === "checkbox" ? setAm({ ...am, [name]: checked }) : setAm({ ...am, [name]: value });

    setError(validaciones());
  };

  const limpiaForm = () => {
    setAm(amDefault);
    obtenerAm(null);
    setError({});
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(validaciones(am));

    if (Object.keys(error).length === 0) {
      amActual !== null ? actualizarAm(AmAEnviar()) : registrarAm(AmAEnviar());
      limpiaForm();
      closeModal();
    } else {
      enqueueSnackbar("Debe corregir los problemas en el formulario", { variant: "error" });
      return false;
    }
  };

  const AmAEnviar = () => {
    let amTmp = { ...am };
    return amTmp;
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
            value={am?.nombre}
            onChangeFN={handleChange}
            onBlur={handleChange}
            //required={true}
            error={error?.nombre}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={am?.activo} label="Activo" />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAm;
