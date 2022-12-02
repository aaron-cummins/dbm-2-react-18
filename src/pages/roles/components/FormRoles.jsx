import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { RolesContext } from "../context/rolesContext";
import { closeModal, formatDate } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormRoles = () => {
  const { registrarRoles, rolesActual, actualizarRoles, obtenerRoles } =
    useContext(RolesContext);
  const { mensaje } = useStateContext();
  const rolesDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      permisosGlobales: [],
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
      activo: false,
    };
  }, []);

  const [roles, setRoles] = useState(rolesDefault);

  useEffect(() => {
    rolesActual ? setRoles(rolesActual) : setRoles(rolesDefault);
  }, [rolesActual, rolesDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setRoles({
          ...roles,
          [e.target.name]: e.target.checked,
        })
      : setRoles({
          ...roles,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setRoles(rolesDefault);
    obtenerRoles(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    rolesActual !== null
      ? actualizarRoles(RolesAEnviar())
      : registrarRoles(RolesAEnviar());
    limpiaForm();
    closeModal();
  };

  const RolesAEnviar = () => {
    let rolesTmp = { ...roles };
    rolesTmp.permisosGlobales && delete rolesTmp.permisosGlobales;
    rolesTmp.permisosGlobales = [];
    rolesTmp.updated_at = formatDate(Date(Date.now));
    return rolesTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid gap-4">
        <div className="form-group">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre rol"
            value={roles.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group form-check mb-6 items-center">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={roles.activo}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormRoles;
