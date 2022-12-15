import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { TipoSalidaContext} from "../context/TipoSalidaContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormTipoSalida = () => {
    const {
        TipoSalidaActual,
        registrarTipoSalida,
        actualizarTipoSalida,
        obtenerTipoSalida,
      } = useContext(TipoSalidaContext);
    const { mensaje } = useStateContext();

    const TipoSalidaDefault = useMemo(
        () => ({
          id: 0,
          nombre: "",
          activo: false,
        }),
        []
      );
    const [TipoSalida, setTipoSalida] = useState(TipoSalidaDefault);

    useEffect(() => {
        TipoSalidaActual
          ? setTipoSalida(TipoSalidaActual)
          : setTipoSalida(TipoSalidaDefault);
    }, [TipoSalidaActual, TipoSalidaDefault]);

    const handleChange = (e) => {
        e.target.name === "activo"
          ? setTipoSalida({
              ...TipoSalida,
              [e.target.name]: e.target.checked,
            })
          : setTipoSalida({
              ...TipoSalida,
              [e.target.name]: e.target.value,
            });
    };

    const limpiaForm = () => {
        setTipoSalida(TipoSalidaDefault);
        obtenerTipoSalida(null);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        TipoSalidaActual
          ? actualizarTipoSalida(TipoSalidaEnviar())
          : registrarTipoSalida(TipoSalidaEnviar());
        limpiaForm();
        closeModal();
    };

    const TipoSalidaEnviar = () => {
        let TipoSalidaTmp = { ...TipoSalida };
        return TipoSalidaTmp;
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
                value={TipoSalida.nombre}
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
                checked={TipoSalida.activo}
              />
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Buttons cancelFN={() => limpiaForm()} />
          </div>
        </form>
      );
}

export default FormTipoSalida