import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Alerts,
  InputText,
  Buttons,
  Checkbox,
  SelectModulo,
  SelectRol,
} from "../../../components";
import { PermisosGlobalesContext } from "../context/permisosGlobalesContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormPermisoGlobal = () => {
  const {
    registrarPermisoGlobal,
    permisoGlobalActual,
    actualizarPermisoGlobal,
    obtenerPermisoGlobal,
  } = useContext(PermisosGlobalesContext);
  const { mensaje } = useStateContext();
  const permisoGlobalDefault = useMemo(() => {
    return {
      id: 0,
      id_rol: 0,
      modulo: {
        id: 0,
      },
    };
  }, []);

  const [PermisoGlobal, setPermisoGlobal] = useState(permisoGlobalDefault);

  useEffect(() => {
    permisoGlobalActual
      ? setPermisoGlobal(permisoGlobalActual)
      : setPermisoGlobal(permisoGlobalDefault);
  }, [permisoGlobalActual, permisoGlobalDefault]);

  const handleChange = (e) => {
    e.target.name === "modulo"
      ? setPermisoGlobal({
          ...PermisoGlobal,
          modulo: {
            id: e.target.value,
          },
        })
      : setPermisoGlobal({
          ...PermisoGlobal,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setPermisoGlobal(permisoGlobalDefault);
    obtenerPermisoGlobal(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    permisoGlobalActual !== null
      ? actualizarPermisoGlobal(PermisoGlobalAEnviar())
      : registrarPermisoGlobal(PermisoGlobalAEnviar());
    limpiaForm();
    closeModal();
  };

  const PermisoGlobalAEnviar = () => {
    let PermisoGlobalTmp = { ...PermisoGlobal };
    return PermisoGlobalTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <SelectModulo
            id="modulo"
            name="modulo"
            value={PermisoGlobal.modulo.id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <SelectRol
            id="id_rol"
            name="id_rol"
            value={PermisoGlobal.id_rol}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPermisoGlobal;
