import React, { useEffect, useState, useContext, useMemo } from "react";
import { Alerts, InputText, Buttons, Checkbox } from "components";
import { MotivoCambioContext} from "../context/MotivoCambioContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";

const FormMotivoCambio = () => {
    const {
        MotivoCambioActual,
        registrarMotivoCambio,
        actualizarMotivoCambio,
        obtenerMotivoCambio,
      } = useContext(MotivoCambioContext);
    const { mensaje } = useStateContext();

    const MotivoCambioDefault = useMemo(
        () => ({
          id: 0,
          nombre: "",
          activo: false,
        }),
        []
      );
    const [MotivoCambio, setMotivoCambio] = useState(MotivoCambioDefault);

    useEffect(() => {
        MotivoCambioActual
          ? setMotivoCambio(MotivoCambioActual)
          : setMotivoCambio(MotivoCambioDefault);
    }, [MotivoCambioActual, MotivoCambioDefault]);

    const handleChange = (e) => {
        e.target.name === "activo"
          ? setMotivoCambio({
              ...MotivoCambio,
              [e.target.name]: e.target.checked,
            })
          : setMotivoCambio({
              ...MotivoCambio,
              [e.target.name]: e.target.value,
            });
    };

    const limpiaForm = () => {
        setMotivoCambio(MotivoCambioDefault);
        obtenerMotivoCambio(null);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        MotivoCambioActual
          ? actualizarMotivoCambio(MotivoCambioEnviar())
          : registrarMotivoCambio(MotivoCambioEnviar());
        limpiaForm();
        closeModal();
    };

    const MotivoCambioEnviar = () => {
        let MotivoCambioTmp = { ...MotivoCambio };
        return MotivoCambioTmp;
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
                value={MotivoCambio.nombre}
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
                checked={MotivoCambio.activo}
              />
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <Buttons cancelFN={() => limpiaForm()} />
          </div>
        </form>
      );
}

export default FormMotivoCambio