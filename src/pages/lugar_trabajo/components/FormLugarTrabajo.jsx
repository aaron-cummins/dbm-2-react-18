import React, { useState } from "react";
import { Alerts } from "../../../components";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormLugarTrabajo = () => {
  const { mensaje } = useStateContext();
  const classStyle =
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  const lugarTrabajoDefault = {
    id: 0,
    nombre: "",
    abreviacion: "",
    latitud: "",
    longitud: "",
    altura: "",
    id_zona: 0,
    direccion: "",
    id_comuna: 0,
    id_region: 0,
    id_tipo_lugar: 0,
    activo: false,
  };

  const [lugarTrabajo, setLugarTrabajo] = useState(lugarTrabajoDefault);

  const handleChange = (e) => {
    setLugarTrabajo({
      ...lugarTrabajo,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    /*if(usuario.apellidos.trim() === '' || usuario.correo === '' || usuario.rut === '' || usuario.uid === ''){
            setMensaje('El Apellido, Correo, Rut y Uid son obligatorios.');
            return;
        }*/
  };
  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <input
            type="text"
            className={classStyle}
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={lugarTrabajo.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            className={classStyle}
            id="abreviacion"
            name="Abreviacion"
            placeholder="Abreviación"
            value={lugarTrabajo.abreviacion}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="longitud"
            name="longitud"
            placeholder="Longitud"
            value={lugarTrabajo.longitud}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="text"
            className={classStyle}
            id="latitud"
            name="latitud"
            placeholder="Latitud"
            value={lugarTrabajo.latitud}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group mb-6">
        <input
          type="text"
          className={classStyle}
          id="direccion"
          name="direccion"
          placeholder="Direccion"
          value={lugarTrabajo.direccion}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_zona"
            name="id_zona"
            placeholder="Zona"
            value={lugarTrabajo.id_zona}
            onChange={handleChange}>
            <option value="1">Zona I</option>
            <option value="2">Zona II</option>
            <option value="3">Zona III</option>
          </select>
        </div>
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_tipo_lugar"
            name="id_tipo_lugar"
            placeholder="Tipo Lugar"
            value={lugarTrabajo.id_tipo_lugar}
            onChange={handleChange}>
            <option value="1">Faena</option>
            <option value="2">Oficina</option>
            <option value="3">Taller</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_Region"
            name="id_Region"
            placeholder="Region"
            value={lugarTrabajo.id_Region}
            onChange={handleChange}>
            <option value="1">Metropolitana</option>
            <option value="2">Atacama</option>
            <option value="3">Iquique</option>
          </select>
        </div>
        <div className="form-group mb-6">
          <select
            className={classStyle}
            id="id_comuna"
            name="id_comuna"
            placeholder="Comuna"
            value={lugarTrabajo.id_comuna}
            onChange={handleChange}>
            <option value="1">Santiago</option>
            <option value="2">Quilicura</option>
            <option value="3">Recoleta</option>
          </select>
        </div>
      </div>

      <div className="form-group form-check text-center mb-6">
        <input
          type="checkbox"
          className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
          id="activo"
          name="activo"
          value={lugarTrabajo.activo}
          onChange={handleChange}
          defaultChecked={lugarTrabajo.activo}
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

export default FormLugarTrabajo;
