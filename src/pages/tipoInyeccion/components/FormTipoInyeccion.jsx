import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoInyeccionContext } from "../context/tipoinyeccionContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormTipoInyeccion = () => {
  const { registrarTipoInyeccion, tipoinyeccionActual, actualizarTipoInyeccion, obtenerTipoInyeccion } =
    useContext(TipoInyeccionContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const tipoinyeccionDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipoinyeccion, setTipoInyeccion] = useState(tipoinyeccionDefault);

  useEffect(() => {
    tipoinyeccionActual ? setTipoInyeccion(tipoinyeccionActual) : setTipoInyeccion(tipoinyeccionDefault);
  }, [tipoinyeccionActual, tipoinyeccionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipoInyeccion({
          ...tipoinyeccion,
          [e.target.name]: e.target.checked,
        })
      : setTipoInyeccion({
          ...tipoinyeccion,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipoInyeccion(tipoinyeccionDefault);
    obtenerTipoInyeccion(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipoinyeccion.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    tipoinyeccionActual
      ? actualizarTipoInyeccion(TipoInyeccionAEnviar())
      : registrarTipoInyeccion(TipoInyeccionAEnviar());

    limpiaForm();
    closeModal();
  };

  const TipoInyeccionAEnviar = () => {
    let tipoinyeccionTmp = { ...tipoinyeccion };
    return tipoinyeccionTmp;
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
            value={tipoinyeccion.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={tipoinyeccion.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoInyeccion;
