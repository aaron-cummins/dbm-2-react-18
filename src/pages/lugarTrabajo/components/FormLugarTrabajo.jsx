import { useState, useContext, useMemo, useEffect } from "react";
import {
  Alerts,
  InputText,
  Buttons,
  Checkbox,
  SelectRegion,
  SelectComuna,
  SelectTipoLugarTrabajo,
  SelectZona,
} from "../../../components";
import { LugarTrabajoContext } from "../contexts/LugarTrabajoContext";
import { closeModal } from "../../../utilities/Utiles";
import { useStateContext } from "../../../contexts/ContextProvider";

const FormLugarTrabajo = () => {
  const {
    obtenerLugarTrabajo,
    lugartrabajoActual,
    actualizarLugarTrabajo,
    registrarLugarTrabajo,
  } = useContext(LugarTrabajoContext);

  const { mensaje } = useStateContext();

  const lugarTrabajoDefault = useMemo(() => {
    return {
      id: 0,
      nombre: "",
      abreviacion: "",
      latitud: "",
      longitud: "",
      altura: "",
      direccion: "",
      telefono: "",
      zonaId: 0,
      comunaId: 0,
      region_id: 0,
      tipoLugarTrabajoId: 0,
      activo: false,
    };
  }, []);

  const [lugarTrabajo, setLugarTrabajo] = useState(lugarTrabajoDefault);

  useEffect(() => {
    lugartrabajoActual !== null
      ? setLugarTrabajo(lugartrabajoActual)
      : setLugarTrabajo(lugarTrabajoDefault);
  }, [lugartrabajoActual, lugarTrabajoDefault]);

  const handleChange = (e) => {
    setLugarTrabajo({
      ...lugarTrabajo,
      [e.target.name]: e.target.value,
    });
  };

  const limpiaForm = () => {
    setLugarTrabajo(lugarTrabajoDefault);
    obtenerLugarTrabajo(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    lugartrabajoActual
      ? actualizarLugarTrabajo(lugarTrabajoAEnviar())
      : registrarLugarTrabajo(lugarTrabajoAEnviar());

    limpiaForm();
    closeModal();
  };

  const lugarTrabajoAEnviar = () => {
    let lugarTrabajoTmp = { ...lugarTrabajo };
    return lugarTrabajoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="grid grid-cols-3 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={lugarTrabajo.nombre}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="abreviacion"
            name="abreviacion"
            placeholder="Abreviación"
            label="Abreviación"
            value={lugarTrabajo.abreviacion}
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-3">
          <InputText
            id="telefono"
            name="telefono"
            placeholder="Telefono"
            label="Telefono"
            value={lugarTrabajo.telefono}
            onChangeFN={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <InputText
            id="longitud"
            name="longitud"
            placeholder="Longitud"
            label="Longitud"
            value={lugarTrabajo.longitud}
            onChangeFN={handleChange}
          />
        </div>
        <div className="form-group mb-6">
          <InputText
            id="latitud"
            name="latitud"
            placeholder="Latitud"
            label="Latitud"
            value={lugarTrabajo.latitud}
            onChangeFN={handleChange}
          />
        </div>
      </div>

      <div className="form-group mb-6">
        <InputText
          id="direccion"
          name="direccion"
          placeholder="Direccion"
          label="Direccion"
          value={lugarTrabajo.direccion}
          onChangeFN={handleChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectZona
            id="zonaId"
            name="zonaId"
            placeholder="Zona"
            value={lugarTrabajo.zonaId}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectTipoLugarTrabajo
            id="tipoLugarTrabajoId"
            name="tipoLugarTrabajoId"
            placeholder="Tipo Lugar"
            value={lugarTrabajo.tipoLugarTrabajoId}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectComuna
            id="comunaId"
            name="comunaId"
            placeholder="Comuna"
            value={lugarTrabajo.comunaId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-6">
          <Checkbox
            id="activo"
            name="activo"
            onChangeFN={handleChange}
            checked={lugarTrabajo.activo}
            label="Activo"
          />
        </div>
      </div>

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormLugarTrabajo;
