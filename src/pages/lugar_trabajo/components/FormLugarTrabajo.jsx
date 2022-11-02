import { useState, useContext, useMemo } from "react";
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
      id_zona: 0,
      direccion: "",
      id_comuna: 0,
      id_region: 0,
      id_tipo_lugar: 0,
      activo: false,
    };
  }, []);

  const [lugarTrabajo, setLugarTrabajo] = useState(lugarTrabajoDefault);

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
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
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
        <div className="form-group mb-4">
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
            id="id_zona"
            name="id_zona"
            placeholder="Zona"
            value={lugarTrabajo.id_zona}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectTipoLugarTrabajo
            id="id_tipo_lugar"
            name="id_tipo_lugar"
            placeholder="Tipo Lugar"
            value={lugarTrabajo.id_tipo_lugar}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <SelectRegion
            id="id_Region"
            name="id_Region"
            placeholder="Region"
            onChangeFN={handleChange}
            required={true}
          />
        </div>
        <div className="form-group mb-6">
          <SelectComuna
            id="id_comuna"
            name="id_comuna"
            placeholder="Comuna"
            value={lugarTrabajo.id_comuna}
            onChange={handleChange}
          />
        </div>
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

      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormLugarTrabajo;
