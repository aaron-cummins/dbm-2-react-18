import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "../../../components";
import { RegionContext } from "../context/regionContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormRegion = () => {
  const { registrarRegion, regionActual, actualizarRegion, obtenerRegion } =
    useContext(RegionContext);
  const { mensaje } = useStateContext();
  const regionDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      numero: "0",
      comunas: [],
      activo: false,
    }),
    []
  );

  const [region, setRegion] = useState(regionDefault);

  useEffect(() => {
    regionActual ? setRegion(regionActual) : setRegion(regionDefault);
  }, [regionActual, regionDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setRegion({
          ...region,
          [e.target.name]: e.target.checked,
        })
      : setRegion({
          ...region,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setRegion(regionDefault);
    obtenerRegion(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    regionActual
      ? actualizarRegion(RegionAEnviar())
      : registrarRegion(RegionAEnviar());
    limpiaForm();
    closeModal();
  };

  const RegionAEnviar = () => {
    let regionTmp = { ...region };
    regionTmp.comunas && delete regionTmp.comunas;
    regionTmp.comunas = [];
    return regionTmp;
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
            value={region.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <InputText
            id="numero"
            name="numero"
            placeholder="Numero"
            label="Numero"
            value={region.numero}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="form-group form-check mb-6 items-center">
        <Checkbox
          id="activo"
          name="activo"
          label="Activo"
          onChangeFN={handleChange}
          checked={region.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormRegion;
