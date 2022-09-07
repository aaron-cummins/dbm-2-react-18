import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons } from "../../../components";
import { VistasContext } from "../context/vistasContext";
import { closeModal, formatDate } from "../../../utilities/Utiles";
import SelectGrupo from "./SelectGrupo";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormVistas = () => {
  const { registrarVistas, vistasActual, actualizarVistas, obtenerVistasGrouplist, obtenerVistas } =
    useContext(VistasContext);
  const { mensaje } = useStateContext();
  const vistasDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      controller: "",
      accion: "",
      id_grupo: 0,
      created_at: formatDate(Date(Date.now)),
      updated_at: formatDate(Date(Date.now)),
    };
  }, []);

  const [vistas, setVistas] = useState(vistasDefault);

  useEffect(() => {
    obtenerVistasGrouplist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    vistasActual ? setVistas(vistasActual) : setVistas(vistasDefault);
  }, [vistasActual, vistasDefault]);

  const handleChange = (e) => {
    setVistas({
      ...vistas,
      [e.target.name]: e.target.value,
    });
  };

  const limpiaForm = () => {
    setVistas(vistasDefault);
    obtenerVistas(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    vistasActual ? actualizarVistas(VistasAEnviar()) : registrarVistas(VistasAEnviar());

    limpiaForm();
    closeModal();
  };

  const VistasAEnviar = () => {
    let vistasTmp = { ...vistas };
    return vistasTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts> : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={vistas.nombre}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-gray-700">Grupo</label>
          <SelectGrupo
            id="id_grupo"
            name="id_grupo"
            value={vistas.id_grupo}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="accion"
            name="accion"
            placeholder="Acción"
            label="Acción"
            value={vistas.accion}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="controller"
            name="controller"
            placeholder="Controller"
            label="Controller"
            value={vistas.controller}
            onChangeFN={handleChange}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormVistas;
