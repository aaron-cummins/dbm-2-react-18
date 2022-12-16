import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormTipolugartrabajo = () => {
  const { registrarTipolugartrabajo, tipolugartrabajoActual, actualizarTipolugartrabajo, obtenerTipolugartrabajo } =
    useContext(TipolugartrabajoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const tipolugartrabajoDefault = useMemo(() => {
    return {
      id: 0,
      tipo: "",
      activo: false,
    };
  }, []);

  const [tipolugartrabajo, setTipolugartrabajo] = useState(tipolugartrabajoDefault);

  useEffect(() => {
    tipolugartrabajoActual ? setTipolugartrabajo(tipolugartrabajoActual) : setTipolugartrabajo(tipolugartrabajoDefault);
  }, [tipolugartrabajoActual, tipolugartrabajoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipolugartrabajo({
          ...tipolugartrabajo,
          [e.target.name]: e.target.checked,
        })
      : setTipolugartrabajo({
          ...tipolugartrabajo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipolugartrabajo(tipolugartrabajoDefault);
    obtenerTipolugartrabajo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipolugartrabajo.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    tipolugartrabajoActual
      ? actualizarTipolugartrabajo(TipolugartrabajoAEnviar())
      : registrarTipolugartrabajo(TipolugartrabajoAEnviar());

    limpiaForm();
    closeModal();
  };

  const TipolugartrabajoAEnviar = () => {
    let tipolugartrabajoTmp = { ...tipolugartrabajo };
    return tipolugartrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="tipo"
            name="tipo"
            placeholder="Tipo"
            label="Tipo"
            value={tipolugartrabajo.tipo}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Checkbox
            id="activo"
            name="activo"
            label="Activo"
            onChangeFN={handleChange}
            checked={tipolugartrabajo.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipolugartrabajo;
