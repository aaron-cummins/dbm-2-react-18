import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons } from "components";
import { TipolugartrabajoContext } from "../context/tipolugartrabajoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormTipolugartrabajo = () => {
  const {
    registrarTipolugartrabajo,
    tipolugartrabajoActual,
    actualizarTipolugartrabajo,
    obtenerTipolugartrabajo,
  } = useContext(TipolugartrabajoContext);
  const { mensaje, alerta } = useStateContext();
  const tipolugartrabajoDefault = useMemo(() => {
    return {
      id: 0,
      tipo: "",
      activo: false,
    };
  }, []);

  const [tipolugartrabajo, setTipolugartrabajo] = useState(
    tipolugartrabajoDefault
  );

  useEffect(() => {
    tipolugartrabajoActual
      ? setTipolugartrabajo(tipolugartrabajoActual)
      : setTipolugartrabajo(tipolugartrabajoDefault);
  }, [tipolugartrabajoActual, tipolugartrabajoDefault]);

  const handleChange = (e) => {
    setTipolugartrabajo({
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
      alerta("danger", "Debe ingresar un nombre valido");
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
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
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
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipolugartrabajo;
