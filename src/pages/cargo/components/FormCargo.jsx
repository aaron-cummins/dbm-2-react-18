import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { CargoContext } from "../context/cargoContext";
import { closeModal } from "utilities/Utiles";
import { useStateContext } from "contexts/ContextProvider";

const FormCargo = () => {
  const { registrarCargo, cargoActual, actualizarCargo, obtenerCargo } =
    useContext(CargoContext);
  const { mensaje } = useStateContext();
  const cargoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      activo: false,
    };
  }, []);

  const [cargo, setCargo] = useState(cargoDefault);

  useEffect(() => {
    cargoActual !== null ? setCargo(cargoActual) : setCargo(cargoDefault);
  }, [cargoActual, cargoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setCargo({
          ...cargo,
          [e.target.name]: e.target.checked,
        })
      : setCargo({
          ...cargo,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setCargo(cargoDefault);
    obtenerCargo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    cargoActual !== null
      ? actualizarCargo(CargoAEnviar())
      : registrarCargo(CargoAEnviar());
    limpiaForm();
    closeModal();
  };

  const CargoAEnviar = () => {
    let cargoTmp = { ...cargo };
    return cargoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={cargo.nombre}
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
            checked={cargo.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormCargo;
