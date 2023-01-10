import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, SelectFlota, SelectFuenteInformacion, SelectConversionLugarTrabajo } from "components";
import { ConversionFlotasContext } from "../context/ConversionFlotasContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormConversionFlotas = () => {
  const { obtenerConversionFlotas, ConversionFlotasActual, actualizarConversionFlotas, registrarConversionFlotas } =
    useContext(ConversionFlotasContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();

  const ConversionFlotasDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      flotasId: 0,
      flotas: {
        id: 0,
      },
      fuenteInformacionId: 0, //funciona para enviar los datos al backend
      fuenteInformacion: {
        id: 0,
      },
      conversionLugarTrabajoId: 0,
      conversionLugarTrabajo: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionFlotas, setConversionFlotas] = useState(ConversionFlotasDefault);

  useEffect(() => {
    ConversionFlotasActual !== null ? setConversionFlotas(ConversionFlotasActual) : setConversionFlotas(ConversionFlotasDefault);
  }, [ConversionFlotasActual, ConversionFlotasDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setConversionFlotas({
          ...ConversionFlotas,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "flotasId"
      ? setConversionFlotas({
          ...ConversionFlotas,
          flotas: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : e.target.name === "fuenteInformacionId"
      ? setConversionFlotas({
          ...ConversionFlotas,
          fuenteInformacion: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : e.target.name === "conversionLugarTrabajoId"
        ? setConversionFlotas({
            ...ConversionFlotas,
            conversionLugarTrabajo: {
              id: e.target.value,
            },
            [e.target.name]: e.target.value,
          })
      : setConversionFlotas({
          ...ConversionFlotas,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setConversionFlotas(ConversionFlotasDefault);
    obtenerConversionFlotas(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    ConversionFlotasActual ? actualizarConversionFlotas(ConversionFlotasEnviar()) : registrarConversionFlotas(ConversionFlotasEnviar());

    limpiaForm();
    closeModal();
  };

  const ConversionFlotasEnviar = () => {
    let ConversionFlotasTmp = { ...ConversionFlotas };
    ConversionFlotasTmp.flotasId = document.querySelector("#flotasId").value;
    ConversionFlotasTmp.fuenteInformacionId = document.querySelector("#fuenteInformacionId").value;
    ConversionFlotasTmp.conversionLugarTrabajoId = document.querySelector("#conversionLugarTrabajoId").value;
    return ConversionFlotasTmp;
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
            value={ConversionFlotas.nombre}
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
            value={ConversionFlotas.abreviacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectFlota
            id="flotasId"
            name="flotasId"
            placeholder="flota"
            value={ConversionFlotas.flotas?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectFuenteInformacion
            id="fuenteInformacionId"
            name="fuenteInformacionId"
            placeholder="fuente de informacion"
            value={ConversionFlotas.fuenteInformacion?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectConversionLugarTrabajo
            id="conversionLugarTrabajoId"
            name="conversionLugarTrabajoId"
            placeholder="Conversión lugar de trabajo"
            value={ConversionFlotas.conversionLugarTrabajo?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ConversionFlotas.activo} label="Activo" />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionFlotas;
