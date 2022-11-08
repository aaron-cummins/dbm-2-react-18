import React, { useEffect, useMemo, useState } from "react";
import {
  Alerts,
  InputText,
  Buttons,
  Checkbox,
  SelectCargo,
  SelectLugarTrabajo,
} from "components";
import { UsuarioContext } from "../context/usuarioContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useContext } from "react";

const FormUsuario = () => {
  const { registrarUsuario, usuarioActual, actualizarUsuario, obtenerUsuario } =
    useContext(UsuarioContext);
  const { mensaje, alerta } = useStateContext();

  const usuarioDefault = useMemo(() => {
    return {
      id: 0,
      rut: "",
      uid: "",
      nombres: "",
      apellidos: "",
      correo: "",
      telefono: "",
      anexo: "",
      password: "",
      cargoId: 0,
      id_lugar_trabajo: 0,
      created_at: Date.now,
      updated_at: Date.now,
      activo: false,
    };
  }, []);

  const [usuario, setUsuario] = useState(usuarioDefault);
  //const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    usuarioActual !== null
      ? setUsuario(usuarioActual)
      : setUsuario(usuarioDefault);
  }, [usuarioActual, usuarioDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setUsuario({
          ...usuario,
          [e.target.name]: e.target.checked,
        })
      : setUsuario({
          ...usuario,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setUsuario(usuarioDefault);
    obtenerUsuario(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      usuario.apellidos.trim() === "" ||
      usuario.correo === "" ||
      usuario.rut === "" ||
      usuario.uid === ""
    ) {
      //setMensaje("El Apellido, Correo, Rut y Uid son obligatorios.");
      alerta("danger", "El Apellido, Correo, Rut y Uid son obligatorios.");
      return;
    }

    usuarioActual !== null
      ? actualizarUsuario(UsuarioAEnviar())
      : registrarUsuario(UsuarioAEnviar());
    limpiaForm();
    closeModal();
  };

  const UsuarioAEnviar = () => {
    let usuarioTmp = { ...usuario };
    return usuarioTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="nombres"
            name="nombres"
            label="Nombres"
            placeholder="Nombres"
            value={usuario.nombres}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="apellidos"
            name="apellidos"
            placeholder="Apellidos"
            label="Apellidos"
            value={usuario.apellidos}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="rut"
            name="rut"
            placeholder="Rut"
            label="Rut"
            value={usuario.rut}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="uid"
            name="uid"
            placeholder="UId"
            label="UId"
            value={usuario.uid}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="form-group mb-6">
        <InputText
          type="email"
          id="correo"
          name="correo"
          placeholder="Correo"
          label="Correo"
          value={usuario.correo}
          onChangeFN={handleChange}
          required={true}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="telefono"
            name="telefono"
            placeholder="Telefono"
            label="Telefono"
            value={usuario.telefono}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="anexo"
            name="anexo"
            placeholder="Anexo"
            label="Anexo"
            value={usuario.anexo}
            onChangeFN={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectCargo
            id="cargoId"
            name="cargoId"
            placeholder="Cargo"
            value={usuario.cargoId}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectLugarTrabajo
            id="id_lugar_trabajo"
            name="id_lugar_trabajo"
            placeholder="Lugar Trabajo"
            value={usuario.id_lugar_trabajo}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="form-group mb-4">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={usuario.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormUsuario;
