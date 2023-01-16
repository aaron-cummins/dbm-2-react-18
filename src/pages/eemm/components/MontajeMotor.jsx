import React, { useContext, useMemo, useState } from "react";
import {
  Filtros,
  Header,
  Seccion,
  SelectEsn,
  SelectFlotaLugarTrabajo,
  SelectLugarTrabajo,
  SelectUnidad,
} from "components";

import { SelectsContext } from "contexts/SelectsContext";

import { TbEngine } from "react-icons/tb";
import { GiMineTruck } from "react-icons/gi";
import FormMontaje from "./montaje/FormMontaje";

const MontajeMotor = () => {
  const { obtenerFlotasLugarTrabajo, obtenerUnidades, obtenerEsn, limpiarUnidades, limpiarEsn } =
    useContext(SelectsContext);
  const montajeMotorDefault = useMemo(
    () => ({
      id: 0,
      lugarTrabajoId: 0,
      flotaLugarTrabajoId: 0,
      flotaLugarTrabajo: {
        id: 0,
      },
      unidadId: 0,
      unidad: {
        id: 0,
      },
      esnId: 0,
      esn: {
        id: 0,
      },
    }),
    []
  );

  const [montajeMotor, setMontajeMotor] = useState(montajeMotorDefault);

  const handleChange = (e) => {
    if (e.target.name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(e.target.value);
      setMontajeMotor({ ...montajeMotor, unidad: { id: 0 }, [e.target.name]: e.target.value });
      limpiarUnidades();
      limpiarEsn();
    } else if (e.target.name === "flotaLugarTrabajoId") {
      obtenerUnidades(e.target.value);
      setMontajeMotor({ ...montajeMotor, flotaLugarTrabajo: { id: e.target.value }, [e.target.name]: e.target.value });
    } else if (e.target.name === "unidadId") {
      obtenerEsn();
      setMontajeMotor({ ...montajeMotor, unidad: { id: e.target.value }, [e.target.name]: e.target.value });
    } else if (e.target.name === "esnId") {
      setMontajeMotor({ ...montajeMotor, esn: { id: e.target.value }, [e.target.name]: e.target.value });
    } else setMontajeMotor({ ...montajeMotor, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    alert("prueba");
  };

  return (
    <>
      <Header category="Administración" title="Montaje Motor" />

      <Filtros Fn={handleSearch}>
        <div className="form-group">
          <SelectLugarTrabajo
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            value={montajeMotor.flotaLugarTrabajo.lugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <SelectFlotaLugarTrabajo
            id="flotaLugarTrabajoId"
            name="flotaLugarTrabajoId"
            placeholder="Flota"
            value={montajeMotor.flotaLugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <SelectUnidad
            id="unidadId"
            name="unidadId"
            placeholder="Unidad"
            value={montajeMotor.unidad.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>

        <div className="form-group">
          <SelectEsn
            id="esnId"
            name="esnId"
            placeholder="ESN"
            value={montajeMotor.esn.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
      </Filtros>

      <Seccion titulo="Historial de la unidad" icono={<GiMineTruck />}></Seccion>

      <Seccion titulo="Historial ESN" icono={<TbEngine />}></Seccion>

      <Seccion titulo="Informacion de montaje">
        <FormMontaje
          lugarTrabajoId={montajeMotor.lugarTrabajoId}
          flotaLugarTrabajoId={montajeMotor.flotaLugarTrabajoId}
          unidadId={montajeMotor.unidadId}
          esnId={montajeMotor.esnId}
        />
      </Seccion>
    </>
  );
};

export default MontajeMotor;
