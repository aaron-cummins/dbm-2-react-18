import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { TipoBlockContext} from "../context/TipoBlockContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormTipoBlock = () => {
  const {
    TipoBlockActual,
    registrarTipoBlock,
    actualizarTipoBlock,
    obtenerTipoBlock,
  } = useContext(TipoBlockContext);
  const { mensaje } = useStateContext();

  const TipoBlockDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      experimental: false,
      activo: false 
    }),
    []
  );
  const [TipoBlock, setTipoBlock] = useState(TipoBlockDefault);

  useEffect(() => {
    TipoBlockActual
      ? setTipoBlock(TipoBlockActual)
      : setTipoBlock(TipoBlockDefault);
  }, [TipoBlockActual, TipoBlockDefault]);

  const handleChange = (e) => {
    if (e.target.name === "activo") {
      setTipoBlock({
        ...TipoBlock,
        [e.target.name]: e.target.checked,
      })
    }else if (e.target.name === "experimental") {
      setTipoBlock({
        ...TipoBlock,
        [e.target.name]: e.target.checked,
      })
    }else {
      setTipoBlock({
        ...TipoBlock,
        [e.target.name]: e.target.value,
      });
    }
  };

  const limpiaForm = () => {
    setTipoBlock(TipoBlockDefault);
    obtenerTipoBlock(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    TipoBlockActual
      ? actualizarTipoBlock(TipoBlockEnviar())
      : registrarTipoBlock(TipoBlockEnviar());
    limpiaForm();
    closeModal();
  };

  const TipoBlockEnviar = () => {
    let TipoBlockTmp = { ...TipoBlock };
    return TipoBlockTmp;
  };

  console.log("AQUI")
  console.log(TipoBlock)

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
                value={TipoBlock.nombre}
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
                checked={TipoBlock.activo}
              />
              <Checkbox
                id="experimental"
                name="experimental"
                label="Experimental"
                onChangeFN={handleChange}
                checked={TipoBlock.experimental}
              />
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Buttons cancelFN={() => limpiaForm()} />
        </div>
      </form>
  )
}

export default FormTipoBlock