import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { VersionEquipoContext } from "../context/versionEquipoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormVersionEquipo = () => {
  const {
    registrarVersionEquipo,
    versionequipoActual,
    actualizarVersionEquipo,
    obtenerVersionEquipo,
  } = useContext(VersionEquipoContext);
  const { mensaje } = useStateContext();
  const versionequipoDefault = useMemo(() => {
    return {
      id: 0,
      version: "",
      activo: false,
    };
  }, []);

  const [versionequipo, setVersionEquipo] = useState(versionequipoDefault);

  useEffect(() => {
    versionequipoActual !== null
      ? setVersionEquipo(versionequipoActual)
      : setVersionEquipo(versionequipoDefault);
  }, [versionequipoActual, versionequipoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setVersionEquipo({
          ...versionequipo,
          [e.target.name]: e.target.checked,
        })
      : setVersionEquipo({
          ...versionequipo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setVersionEquipo(versionequipoDefault);
    obtenerVersionEquipo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    versionequipoActual !== null
      ? actualizarVersionEquipo(VersionEquipoAEnviar())
      : registrarVersionEquipo(VersionEquipoAEnviar());
    limpiaForm();
    closeModal();
  };

  const VersionEquipoAEnviar = () => {
    let versionequipoTmp = { ...versionequipo };
    return versionequipoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="version"
            name="version"
            placeholder="Versión"
            label="Versión"
            value={versionequipo.version}
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
            checked={versionequipo.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVersionEquipo;
