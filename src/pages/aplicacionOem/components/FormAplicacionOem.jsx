import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { AplicacionOemContext } from "../context/aplicacionOemContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormAplicacionOem = () => {
  const { aplicacionOemActual, registrarAplicacionOem, actualizarAplicacionOem, obtenerAplicacionOem } =
    useContext(AplicacionOemContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const aplicacionoemDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [aplicacionoem, setAplicacionOem] = useState(aplicacionoemDefault);

  useEffect(() => {
    aplicacionOemActual ? setAplicacionOem(aplicacionOemActual) : setAplicacionOem(aplicacionoemDefault);
  }, [aplicacionOemActual, aplicacionoemDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setAplicacionOem({
          ...aplicacionoem,
          [e.target.name]: e.target.checked,
        })
      : setAplicacionOem({
          ...aplicacionoem,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setAplicacionOem(aplicacionoemDefault);
    obtenerAplicacionOem(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    aplicacionOemActual
      ? actualizarAplicacionOem(AplicacionOemAEnviar())
      : registrarAplicacionOem(AplicacionOemAEnviar());
    limpiaForm();
    closeModal();
  };

  const AplicacionOemAEnviar = () => {
    let aplicacionoemTmp = { ...aplicacionoem };
    return aplicacionoemTmp;
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
            value={aplicacionoem?.nombre}
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
            checked={aplicacionoem?.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormAplicacionOem;
