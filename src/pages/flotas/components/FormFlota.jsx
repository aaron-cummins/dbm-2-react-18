import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { FlotaContext } from "../context/flotaContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormFlota = () => {
  const { registrarFlota, flotaActual, actualizarFlota, obtenerFlota } = useContext(FlotaContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const flotaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );

  const [flota, setFlota] = useState(flotaDefault);

  useEffect(() => {
    flotaActual !== null ? setFlota(flotaActual) : setFlota(flotaDefault);
  }, [flotaActual, flotaDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setFlota({
          ...flota,
          [e.target.name]: e.target.checked,
        })
      : setFlota({
          ...flota,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setFlota(flotaDefault);
    obtenerFlota(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    flotaActual !== null ? actualizarFlota(FlotaAEnviar()) : registrarFlota(FlotaAEnviar());
    limpiaForm();
    closeModal();
  };

  const FlotaAEnviar = () => {
    let flotaTmp = { ...flota };
    return flotaTmp;
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
            value={flota.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="form-group form-check mb-6 items-center">
        <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={flota.activo} />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormFlota;
