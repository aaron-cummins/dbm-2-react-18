import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, SelectFuenteInformacion, SelectLugarTrabajo } from "components";
import { ConversionLugarTrabajoContext } from "../context/ConversionLugarTrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormConversionLugarTrabajo = () => {
  const { obtenerConversionLugarTrabajo, ConversionLugarTrabajoActual, actualizarConversionLugarTrabajo, registrarConversionLugarTrabajo } =
    useContext(ConversionLugarTrabajoContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();

  const ConversionLugarTrabajoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      fuenteInformacionId: 0, //funciona para enviar los datos al backend
      fuenteInformacion: {
        id: 0,
      },
      lugarTrabajoId: 0,
      lugarTrabajo: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionLugarTrabajo, setConversionLugarTrabajo] = useState(ConversionLugarTrabajoDefault);

  useEffect(() => {
    ConversionLugarTrabajoActual !== null ? setConversionLugarTrabajo(ConversionLugarTrabajoActual) : setConversionLugarTrabajo(ConversionLugarTrabajoDefault);
  }, [ConversionLugarTrabajoActual, ConversionLugarTrabajoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setConversionLugarTrabajo({
          ...ConversionLugarTrabajo,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "lugarTrabajoId"
      ? setConversionLugarTrabajo({
          ...ConversionLugarTrabajo,
          lugarTrabajo: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : e.target.name === "fuenteInformacionId"
      ? setConversionLugarTrabajo({
          ...ConversionLugarTrabajo,
          fuenteInformacion: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : setConversionLugarTrabajo({
          ...ConversionLugarTrabajo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setConversionLugarTrabajo(ConversionLugarTrabajoDefault);
    obtenerConversionLugarTrabajo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    ConversionLugarTrabajoActual ? actualizarConversionLugarTrabajo(ConversionLugarTrabajoEnviar()) : registrarConversionLugarTrabajo(ConversionLugarTrabajoEnviar());

    limpiaForm();
    closeModal();
  };

  const ConversionLugarTrabajoEnviar = () => {
    let ConversionLugarTrabajoTmp = { ...ConversionLugarTrabajo };
    ConversionLugarTrabajoTmp.lugarTrabajoId = document.querySelector("#lugarTrabajoId").value;
    ConversionLugarTrabajoTmp.fuenteInformacionId = document.querySelector("#fuenteInformacionId").value;
    return ConversionLugarTrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={ConversionLugarTrabajo.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviación"
            label="Abreviación"
            value={ConversionLugarTrabajo.abreviacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectLugarTrabajo
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="lugar Trabajo"
            value={ConversionLugarTrabajo.lugarTrabajo?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectFuenteInformacion
            id="fuenteInformacionId"
            name="fuenteInformacionId"
            placeholder="fuente de informacion"
            value={ConversionLugarTrabajo.fuenteInformacion?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ConversionLugarTrabajo.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionLugarTrabajo;
