import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EstadoEquipoInstalacionContext } from "../context/EstadoEquipoInstalacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormEstadoEquipoInstalacion = () => {
  const {
    EstadoEquipoInstalacionActual,
    registrarEstadoEquipoInstalacion,
    actualizarEstadoEquipoInstalacion,
    obtenerEstadoEquipoInstalacion,
  } = useContext(EstadoEquipoInstalacionContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const EstadoEquipoInstalacionDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [EstadoEquipoInstalacion, setEstadoEquipoInstalacion] = useState(EstadoEquipoInstalacionDefault);

  useEffect(() => {
    EstadoEquipoInstalacionActual
      ? setEstadoEquipoInstalacion(EstadoEquipoInstalacionActual)
      : setEstadoEquipoInstalacion(EstadoEquipoInstalacionDefault);
  }, [EstadoEquipoInstalacionActual, EstadoEquipoInstalacionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setEstadoEquipoInstalacion({
          ...EstadoEquipoInstalacion,
          [e.target.name]: e.target.checked,
        })
      : setEstadoEquipoInstalacion({
          ...EstadoEquipoInstalacion,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setEstadoEquipoInstalacion(EstadoEquipoInstalacionDefault);
    obtenerEstadoEquipoInstalacion(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    EstadoEquipoInstalacionActual
      ? actualizarEstadoEquipoInstalacion(EstadoEquipoInstalacionEnviar())
      : registrarEstadoEquipoInstalacion(EstadoEquipoInstalacionEnviar());
    limpiaForm();
    closeModal();
  };

  const EstadoEquipoInstalacionEnviar = () => {
    let EstadoEquipoInstalacionTmp = { ...EstadoEquipoInstalacion };
    return EstadoEquipoInstalacionTmp;
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
            value={EstadoEquipoInstalacion.nombre}
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
            checked={EstadoEquipoInstalacion.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoEquipoInstalacion;
