import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons } from "../../../components";
import { VistasGroupContext } from "../context/vistasGroupContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import SelectModulo from "./SelectModulo";
import { closeModal } from "../../../utilities/Utiles";

const FormVistasGroup = () => {
  const {
    registrarVistasGroup,
    vistasgroupActual,
    actualizarVistasGroup,
    obtenerModuloslist,
    obtenerVistasGroup,
  } = useContext(VistasGroupContext);
  const { mensaje } = useStateContext();
  const vistasgroupDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      id_modulo: 0,
    };
  }, []);

  const [vistasgroup, setVistasGroup] = useState(vistasgroupDefault);

  useEffect(() => {
    obtenerModuloslist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    vistasgroupActual ? setVistasGroup(vistasgroupActual) : setVistasGroup(vistasgroupDefault);
  }, [vistasgroupActual, vistasgroupDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setVistasGroup({
          ...vistasgroup,
          [e.target.name]: e.target.checked,
        })
      : setVistasGroup({
          ...vistasgroup,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setVistasGroup(vistasgroupDefault);
    obtenerVistasGroup(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    vistasgroupActual
      ? actualizarVistasGroup(VistasGroupAEnviar())
      : registrarVistasGroup(VistasGroupAEnviar());

    limpiaForm();
    closeModal();
  };

  const VistasGroupAEnviar = () => {
    let vistasgroupTmp = { ...vistasgroup };
    return vistasgroupTmp;
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
            value={vistasgroup.nombre}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-4">
          <label className="text-gray-700">Modulos</label>
          <SelectModulo
            id="id_modulo"
            name="id_modulo"
            value={vistasgroup.id_modulo}
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

export default FormVistasGroup;
