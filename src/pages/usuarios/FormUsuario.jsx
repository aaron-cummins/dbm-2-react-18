import React, { useState } from "react";
import { Alerts } from "../../components";

const FormUsuario = () => {
  const classStyle =
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const usuarioDefault = {
    id: 0,
    rut: "",
    uid: "",
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    anexo: "",
    id_cargo: 0,
    id_lugar_trabajo: 0,
    created_at: Date.now,
    updated_at: Date.now,
    activo: false,
  };

  const [usuario, setUsuario] = useState(usuarioDefault);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (
      usuario.apellidos.trim() === "" ||
      usuario.correo === "" ||
      usuario.rut === "" ||
      usuario.uid === ""
    ) {
      setMensaje("El Apellido, Correo, Rut y Uid son obligatorios.");
      return;
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje ? <Alerts type="danger">{mensaje}</Alerts> : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="nombres"
            name="nombres"
            placeholder="Nombres"
            value={usuario.nombres}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="apellidos"
            name="apellidos"
            placeholder="Apellidos"
            value={usuario.apellidos}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="rut"
            name="rut"
            placeholder="Rut"
            value={usuario.rut}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="uid"
            name="uid"
            placeholder="UId"
            value={usuario.uid}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group mb-6">
        <input
          type="email"
          className={classStyle}
          id="correo"
          name="correo"
          placeholder="Correo"
          value={usuario.correo}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="telefono"
            name="telefono"
            placeholder="Telefono"
            value={usuario.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="anexo"
            name="anexo"
            placeholder="Anexo"
            value={usuario.anexo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_cargo"
            name="id_cargo"
            placeholder="Cargo"
            value={usuario.id_cargo}
            onChange={handleChange}>
            <option value="1">Administrador</option>
            <option value="2">Confiable</option>
            <option value="3">Tecnico</option>
          </select>
        </div>
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_lugar_trabajo"
            name="id_lugar_trabajo"
            placeholder="Lugar Trabajo"
            value={usuario.id_lugar_trabajo}
            onChange={handleChange}>
            <option value="1">Antucoya</option>
            <option value="2">Spence</option>
            <option value="3">Gaby</option>
          </select>
        </div>
      </div>

      <div className="form-group form-check text-center mb-6">
        <input
          type="checkbox"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
          id="activo"
          name="activo"
          value={usuario.activo}
          onChange={handleChange}
          defaultChecked={usuario.activo}
        />
        <label className="form-check-label inline-block text-gray-800" htmlFor="activo">
          Activo
        </label>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button
          type="button"
          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-red-cummins hover:bg-red-cummins hover:shadow-lg focus:bg-red-cummins focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-cummins active:shadow-lg transition duration-150 ease-in-out ml-1">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormUsuario;
