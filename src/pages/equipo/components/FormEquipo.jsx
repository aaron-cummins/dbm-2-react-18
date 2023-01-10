import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox, SelectAplicacionOem, SelectOem } from "components";
import { EquipoContext } from "../context/equipoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormEquipo = () => {
  const { registrarEquipo, equipoActual, actualizarEquipo, obtenerEquipo } = useContext(EquipoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();
  const equipoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      aplicacionOemId: 0,
      aplicacionOem: {
        nombre: "",
      },
      oemId: 0,
      oem: {
        nombre: "",
      },
      activo: false,
    }),
    []
  );

  const [equipo, setEquipo] = useState(equipoDefault);

  useEffect(() => {
    equipoActual !== null ? setEquipo(equipoActual) : setEquipo(equipoDefault);
  }, [equipoActual, equipoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setEquipo({
          ...equipo,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "aplicacionOemId"
      ? setEquipo({
          ...equipo,
          aplicacionOemId: e.target.value,
          aplicacionOem: {
            nombre: e.target.options[e.target.selectedIndex].text,
          },
        })
      : e.target.name === "oemId"
      ? setEquipo({
          ...equipo,
          oemId: e.target.value,
          oem: {
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
    obtenerEquipo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    equipoActual !== null ? actualizarEquipo(EquipoAEnviar()) : registrarEquipo(EquipoAEnviar());
    limpiaForm();
    closeModal();
  };

  const EquipoAEnviar = () => {
    let equipoTmp = { ...equipo };
    return equipoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={equipo.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <SelectAplicacionOem
            id="aplicacionOemId"
            name="aplicacionOemId"
            value={equipo.aplicacionOemId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-4">
          <SelectOem id="oemId" name="oemId" value={equipo.oemId} onChange={handleChange} required={true} />
        </div>
        <div className="form-group mb-2">
          <Checkbox id="activo" name="activo" label="Activo" onChangeFN={handleChange} checked={equipo.activo} />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormEquipo;
