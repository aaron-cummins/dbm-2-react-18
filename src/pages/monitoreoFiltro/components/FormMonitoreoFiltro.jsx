import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { MonitoreoFiltroContext } from "../context/monitoreoFiltroContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormMonitoreoFiltro = () => {
  const { registrarMonitoreoFiltro, monitoreofiltroActual, actualizarMonitoreoFiltro, obtenerMonitoreoFiltro } =
    useContext(MonitoreoFiltroContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const monitoreofiltroDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [monitoreofiltro, setMonitoreoFiltro] = useState(monitoreofiltroDefault);

  useEffect(() => {
    monitoreofiltroActual !== null
      ? setMonitoreoFiltro(monitoreofiltroActual)
      : setMonitoreoFiltro(monitoreofiltroDefault);
  }, [monitoreofiltroActual, monitoreofiltroDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setMonitoreoFiltro({
          ...monitoreofiltro,
          [e.target.name]: e.target.checked,
        })
      : setMonitoreoFiltro({
          ...monitoreofiltro,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setMonitoreoFiltro(monitoreofiltroDefault);
    obtenerMonitoreoFiltro(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (monitoreofiltro.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    monitoreofiltroActual !== null
      ? actualizarMonitoreoFiltro(MonitoreoFiltroAEnviar())
      : registrarMonitoreoFiltro(MonitoreoFiltroAEnviar());

    limpiaForm();
    closeModal();
  };

  const MonitoreoFiltroAEnviar = () => {
    let monitoreofiltroTmp = { ...monitoreofiltro };
    return monitoreofiltroTmp;
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
            value={monitoreofiltro.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            onChangeFN={handleChange}
            checked={monitoreofiltro.activo}
            label="Activo"
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormMonitoreoFiltro;
