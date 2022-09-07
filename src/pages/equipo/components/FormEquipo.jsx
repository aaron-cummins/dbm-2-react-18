import React, { useEffect, useState, useContext } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
//import SelectRegion from "./SelectRegion";
import { EquipoContext } from "../context/equipoContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormEquipo = () => {
  const { registrarEquipo, equipoActual, actualizarEquipo } = useContext(EquipoContext);
  const { mensaje } = useStateContext();

  const equipoDefault = {
    id: 0,
    nombre: "",
    activo: false,
    aplicacionOem: {
      id: 0,
      nombre: "",
    },
    oem: {
      id: 0,
      nombre: "",
    },
    versionEquipos: {
      id: 0,
      nombre: "",
    },
  };

  const [equipo, setEquipo] = useState(equipoDefault);

  useEffect(() => {}, []);

  useEffect(() => {
    equipoActual !== null ? setEquipo(equipoActual) : setEquipo(equipoDefault);
  }, [equipoActual]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setEquipo({
          ...equipo,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "aplicacionOem"
      ? setEquipo({
          ...equipo,
          aplicacionOem: {
            id: e.target.value,
            nombre: e.target.options[e.target.selectedIndex].text,
          },
        })
      : e.target.name === "oem"
      ? setEquipo({
          ...equipo,
          oem: {
            id: e.target.value,
            nombre: e.target.options[e.target.selectedIndex].text,
          },
        })
      : e.target.name === "versionEquipo"
      ? setEquipo({
          ...equipo,
          versionEquipos: {
            id: e.target.value,
            nombre: e.target.options[e.target.selectedIndex].text,
          },
        })
      : setEquipo({
          ...equipo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setEquipo(equipoDefault);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (equipoActual !== null) {
      actualizarEquipo(EquipoAEnviar());
    } else {
      registrarEquipo(EquipoAEnviar());
    }
    limpiaForm();
    closeModal();
  };

  const EquipoAEnviar = () => {
    let equipoTmp = { ...equipo };
    //if(usuarioTmp.anexo === "") delete usuarioTmp.anexo;
    return equipoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje ? <Alerts type={tipoAlerta}>{mensaje}</Alerts> : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={equipo.nombre}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChange={handleChange}
          checked={equipo.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEquipo;
