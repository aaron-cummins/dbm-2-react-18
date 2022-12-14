import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { SelectRegion } from "components";
import { ComunaContext } from "../context/comunaContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormComuna = () => {
  const { registrarComuna, comunaActual, actualizarComuna, obtenerComuna } =
    useContext(ComunaContext);

  const { mensaje } = useStateContext();
  const comunaDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      regionId: 0,
      region: {
        nombre: "",
      },
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
      : e.target.name === "regionId"
      ? setComuna({
          ...comuna,
          regionId: e.target.value,
          region: {
            nombre: e.target.options[e.target.selectedIndex].text,
          },
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
    let region = document.querySelector("#regionId");

    console.log(isNaN(region.value));

    if (isNaN(region.value)) {
      alert("Debe seleccionar una región");
      return false;
    }

    comunaActual !== null
      ? actualizarComuna(ComunaAEnviar())
      : registrarComuna(ComunaAEnviar());
    limpiaForm();
    closeModal();
  };

  const ComunaAEnviar = () => {
    let comunaTmp = { ...comuna };
    comunaTmp.regionId = document.querySelector("#regionId").value;
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
          <SelectRegion
            id="regionId"
            name="regionId"
            Label="Región"
            value={comuna.region.id}
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
