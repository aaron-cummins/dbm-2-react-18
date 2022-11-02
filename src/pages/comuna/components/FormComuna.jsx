import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  Alerts,
  InputText,
  Buttons,
  Checkbox,
  Label,
} from "../../../components";
import { SelectRegion } from "../../../components";
import { ComunaContext } from "../context/comunaContext";
import { useStateContext } from "../../../contexts/ContextProvider";
import { closeModal } from "../../../utilities/Utiles";

const FormComuna = () => {
  const { registrarComuna, comunaActual, actualizarComuna, obtenerComuna } =
    useContext(ComunaContext);

  const { mensaje } = useStateContext();
  const comunaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      regionId: 0,
      /*region: {
        activo: true,
        id: 0,
        nombre: "",
        numero: "",
      },*/
      activo: false,
    }),
    []
  );

  const [comuna, setComuna] = useState(comunaDefault);

  useEffect(() => {
    comunaActual !== null ? setComuna(comunaActual) : setComuna(comunaDefault);
  }, [comunaActual, comunaDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setComuna({
          ...comuna,
          [e.target.name]: e.target.checked,
        })
      : setComuna({
          ...comuna,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setComuna(comunaDefault);
    obtenerComuna(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    comunaActual !== null
      ? actualizarComuna(ComunaAEnviar())
      : registrarComuna(ComunaAEnviar());
    limpiaForm();
    closeModal();
  };

  const ComunaAEnviar = () => {
    let comunaTmp = { ...comuna };
    return comunaTmp;
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
            value={comuna.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-4">
          <Label>Región</Label>
          <SelectRegion
            id="regionId"
            name="regionId"
            value={comuna.regionId}
            onChange={handleChange}
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
          checked={comuna.activo}
        />
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormComuna;
