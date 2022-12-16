import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { EstadoEquipoContext } from "../context/EstadoEquipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormEstadoEquipo = () => {
  const { EstadoEquipoActual, registrarEstadoEquipo, actualizarEstadoEquipo, obtenerEstadoEquipo } =
    useContext(EstadoEquipoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const EstadoEquipoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [EstadoEquipo, setEstadoEquipo] = useState(EstadoEquipoDefault);

  useEffect(() => {
    EstadoEquipoActual ? setEstadoEquipo(EstadoEquipoActual) : setEstadoEquipo(EstadoEquipoDefault);
  }, [EstadoEquipoActual, EstadoEquipoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setEstadoEquipo({
          ...EstadoEquipo,
          [e.target.name]: e.target.checked,
        })
      : setEstadoEquipo({
          ...EstadoEquipo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setEstadoEquipo(EstadoEquipoDefault);
    obtenerEstadoEquipo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    EstadoEquipoActual ? actualizarEstadoEquipo(EstadoEquipoEnviar()) : registrarEstadoEquipo(EstadoEquipoEnviar());
    limpiaForm();
    closeModal();
  };

  const EstadoEquipoEnviar = () => {
    let EstadoEquipoTmp = { ...EstadoEquipo };
    return EstadoEquipoTmp;
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
            value={EstadoEquipo.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={EstadoEquipo.activo} />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEstadoEquipo;
