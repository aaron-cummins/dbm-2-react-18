import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { EstadoMotorInstalacionContext} from "../context/EstadoMotorInstalacionContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormEstadoMotorInstalacion = () => {
    const {
        EstadoMotorInstalacionActual,
        registrarEstadoMotorInstalacion,
        actualizarEstadoMotorInstalacion,
        obtenerEstadoMotorInstalacion,
      } = useContext(EstadoMotorInstalacionContext);
    const { mensaje } = useStateContext();

    const EstadoMotorInstalacionDefault = useMemo(
        () => ({
          id: 0,
          nombre: "",
          activo: false,
        }),
        []
      );
    const [EstadoMotorInstalacion, setEstadoMotorInstalacion] = useState(EstadoMotorInstalacionDefault);

    useEffect(() => {
        EstadoMotorInstalacionActual
          ? setEstadoMotorInstalacion(EstadoMotorInstalacionActual)
          : setEstadoMotorInstalacion(EstadoMotorInstalacionDefault);
    }, [EstadoMotorInstalacionActual, EstadoMotorInstalacionDefault]);

    const handleChange = (e) => {
        e.target.name === "activo"
          ? setEstadoMotorInstalacion({
              ...EstadoMotorInstalacion,
              [e.target.name]: e.target.checked,
            })
          : setEstadoMotorInstalacion({
              ...EstadoMotorInstalacion,
              [e.target.name]: e.target.value,
            });
    };

    const limpiaForm = () => {
        setEstadoMotorInstalacion(EstadoMotorInstalacionDefault);
        obtenerEstadoMotorInstalacion(null);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        EstadoMotorInstalacionActual
          ? actualizarEstadoMotorInstalacion(EstadoMotorInstalacionEnviar())
          : registrarEstadoMotorInstalacion(EstadoMotorInstalacionEnviar());
        limpiaForm();
        closeModal();
    };

    const EstadoMotorInstalacionEnviar = () => {
        let EstadoMotorInstalacionTmp = { ...EstadoMotorInstalacion };
        return EstadoMotorInstalacionTmp;
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
                value={EstadoMotorInstalacion.nombre}
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
                checked={EstadoMotorInstalacion.activo}
              />
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Buttons cancelFN={() => limpiaForm()} />
          </div>
        </form>
      );
}

export default FormEstadoMotorInstalacion