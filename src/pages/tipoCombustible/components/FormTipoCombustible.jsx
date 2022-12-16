import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { TipoCombustibleContext } from "../context/tipocombustibleContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";
import { useSnackbar } from "notistack";

const FormTipoCombustible = () => {
  const { registrarTipoCombustible, tipocombustibleActual, actualizarTipoCombustible, obtenerTipoCombustible } =
    useContext(TipoCombustibleContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();
  const tipocombustibleDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [tipocombustible, setTipoCombustible] = useState(tipocombustibleDefault);

  useEffect(() => {
    tipocombustibleActual ? setTipoCombustible(tipocombustibleActual) : setTipoCombustible(tipocombustibleDefault);
  }, [tipocombustibleActual, tipocombustibleDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setTipoCombustible({
          ...tipocombustible,
          [e.target.name]: e.target.checked,
        })
      : setTipoCombustible({
          ...tipocombustible,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setTipoCombustible(tipocombustibleDefault);
    obtenerTipoCombustible(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (tipocombustible.nombre === "") {
      enqueueSnackbar("Debe ingresar un nombre valido", { variant: "error" });
      return false;
    }

    tipocombustibleActual
      ? actualizarTipoCombustible(TipoCombustibleAEnviar())
      : registrarTipoCombustible(TipoCombustibleAEnviar());

    limpiaForm();
    closeModal();
  };

  const TipoCombustibleAEnviar = () => {
    let tipocombustibleTmp = { ...tipocombustible };
    return tipocombustibleTmp;
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
            value={tipocombustible.nombre}
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
            checked={tipocombustible.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormTipoCombustible;
