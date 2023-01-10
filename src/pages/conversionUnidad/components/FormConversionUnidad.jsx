import { useState, useContext, useMemo, useEffect } from "react";
import { InputText, Buttons, Checkbox, SelectConversionFlota, SelectUnidad } from "components";
import { ConversionUnidadContext } from "../context/ConversionUnidadContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormConversionUnidad = () => {
  const { obtenerConversionUnidad, ConversionUnidadActual, actualizarConversionUnidad, registrarConversionUnidad } =
    useContext(ConversionUnidadContext);
  const { enqueueSnackbar } = useSnackbar();
  const { mensaje } = useStateContext();

  const ConversionUnidadDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      conversionFlotasId: 0,
      conversionFlotas: {
        id: 0,
      },
      unidadId: 0, 
      unidad: {
        id: 0,
      },
      activo: false,
    };
  }, []);

  const [ConversionUnidad, setConversionUnidad] = useState(ConversionUnidadDefault);

  useEffect(() => {
    ConversionUnidadActual !== null ? setConversionUnidad(ConversionUnidadActual) : setConversionUnidad(ConversionUnidadDefault);
  }, [ConversionUnidadActual, ConversionUnidadDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setConversionUnidad({
          ...ConversionUnidad,
          [e.target.name]: e.target.checked,
        })
      : e.target.name === "conversionFlotasId"
      ? setConversionUnidad({
          ...ConversionUnidad,
          conversionFlotas: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : e.target.name === "unidadId"
      ? setConversionUnidad({
          ...ConversionUnidad,
          unidad: {
            id: e.target.value,
          },
          [e.target.name]: e.target.value,
        })
      : setConversionUnidad({
          ...ConversionUnidad,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setConversionUnidad(ConversionUnidadDefault);
    obtenerConversionUnidad(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    ConversionUnidadActual ? actualizarConversionUnidad(ConversionUnidadEnviar()) : registrarConversionUnidad(ConversionUnidadEnviar());

    limpiaForm();
    closeModal();
  };

  const ConversionUnidadEnviar = () => {
    let ConversionUnidadTmp = { ...ConversionUnidad };
    ConversionUnidadTmp.conversionFlotasId = document.querySelector("#conversionFlotasId").value;
    ConversionUnidadTmp.unidadId = document.querySelector("#unidadId").value;
    return ConversionUnidadTmp;
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
            value={ConversionUnidad.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
                <Checkbox id="activo" name="activo" onChangeFN={handleChange} checked={ConversionUnidad.activo} label="Activo" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectUnidad
            id="unidadId"
            name="unidadId"
            placeholder="unidad"
            value={ConversionUnidad.unidad?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectConversionFlota
            id="conversionFlotasId"
            name="conversionFlotasId"
            placeholder="conversionFlotas"
            value={ConversionUnidad.conversionFlotas?.id}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormConversionUnidad;
