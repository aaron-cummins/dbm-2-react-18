import React, { createContext, useMemo, useReducer, useState } from "react";
import {
  OBTENER,
  OBTENER_LISTA,
  REGISTRAR,
  ACTUALIZAR,
  ELIMINAR,
  OBTENER_LISTA_UNIDAD,
  OBTENER_LISTA_ESN,
} from "const/actionTypes";
import { getList, getByID, postObject, putObject, deleteObject } from "services/genericService";
import eemmReducer from "../reducer/eemmReducer";
import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";
import { formatDateshort } from "utilities/Utiles";

export const EemmContext = createContext();

export const EemmContextProvider = (props) => {
  const { callEndpoint } = useFetchAndLoad();
  const { alerta } = useStateContext();
  const urlApi = "eemm";

  const eemmDefault = useMemo(
    () => ({
      activo: false,
      adId: 0,
      ad: { id: 0 },
      amId: 0,
      am: { id: 0 },
      aprobadorDesmontajeId: 0,
      aprobadorDesmontaje: { id: 0 },
      aprobadorId: 0,
      aprobador: { id: 0 },
      aprobadorMontajeId: 0,
      aprobadorMontaje: { id: 0 },
      causaRaiz: "",
      contratoId: 0,
      contrato: { id: 0 },
      esnId: 0,
      esn: { id: 0 },
      estadoEquipoId: 0,
      estadoEquipo: { id: 0 },
      estadoEquipoInstalacionId: 0,
      estadoEquipoInstalacion: { id: 0 },
      estadoMotorId: 0,
      estadoMotor: { id: 0 },
      estadoMotorInstalacionId: 0,
      estadoMotorInstalacion: { id: 0 },
      fechaFalla: formatDateshort(Date.now()),
      fechaps: formatDateshort(Date.now()),
      flotaLugarTrabajoId: 0,
      flotaLugarTrabajo: { id: 0 },
      hrAcumuladasMotor: 0,
      hrEquipoInstalacion: 0,
      hrHistoricoEquipo: 0,
      hrHistoricoMotor: 0,
      hrMotorInstalacion: 0,
      hrOperadaMotor: 0,
      id: 0,
      intervencionId: 0,
      intervencon: { id: 0 },
      motivoCambioId: 0,
      motivoCambio: { id: 0 },
      tipoSalidaId: 0,
      tipoSalida: { id: 0 },
      tsr: "",
      ubId: 0,
      ub: { id: 0 },
      unidadId: 0,
      unidad: { id: 0 },
      lugarTrabajoId: 0,
      axial: 0.0,
    }),
    []
  );

  const [eemm, setEemm] = useState(eemmDefault);

  const initialState = {
    eemmList: [],
    eemmActual: null,
    eemmUnidad: [],
    eemmEsn: [],
  };

  const [state, dispatch] = useReducer(eemmReducer, initialState);

  /* OBETENER LISTADO DE por unidad EEMMS */
  const obtenerEemmUnidadlist = async (id_unidad) => {
    let montado = false;
    try {
      const resultado = await callEndpoint(getList(`${urlApi}/unidad/${id_unidad}`));

      if (resultado && resultado.data) {
        resultado.data.forEach((item) => {
          item.activo === true ? (montado = true) : (montado = false);
        });

        dispatch({
          type: OBTENER_LISTA_UNIDAD,
          payload: resultado.data,
        });
      }

      return montado;
    } catch (error) {
      console.log(error);
      return montado;
    }
  };

  /* OBETENER LISTADO DE por ESN EEMMS */
  const obtenerEemmEsnlist = async (id_esn) => {
    try {
      const resultado = await callEndpoint(getList(`${urlApi}/esn/${id_esn}`));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA_ESN,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBETENER LISTADO DE EEMMS */
  const obtenerEemmlist = async () => {
    try {
      const resultado = await callEndpoint(getList(urlApi));
      if (resultado && resultado.data) {
        dispatch({
          type: OBTENER_LISTA,
          payload: resultado.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* OBTENER UNA EEMM */
  const obtenerEemm = async (eemm) => {
    try {
      let eemmEncontrada = null;
      if (eemm !== null) {
        const resultado = await callEndpoint(getByID(urlApi, eemm.id));
        if (resultado && resultado.data) {
          eemmEncontrada = resultado.data;
        }
      } else {
        eemmEncontrada = eemm;
      }

      dispatch({
        type: OBTENER,
        payload: eemmEncontrada,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* REGISTRAR EEMM */
  const registrarEemm = async (eemm) => {
    try {
      const resultado = await callEndpoint(postObject(urlApi, eemm));
      dispatch({
        type: REGISTRAR,
        payload: resultado.data,
      });
      alerta("success", "Montaje realizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar realizar el montaje. ${error}`);
    }
  };

  /* ACTUALIZAR EEMM */
  const actualizarEemm = async (eemm) => {
    try {
      const resultado = await callEndpoint(putObject(urlApi, eemm));

      dispatch({
        type: ACTUALIZAR,
        payload: resultado.data,
      });
      alerta("success", "Montaje actualizado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar actualizar el Montaje. ${error}`);
    }
  };

  /* ELIMINAR EEMM */
  const eliminarEemm = async (id) => {
    try {
      await callEndpoint(deleteObject(urlApi, id));
      dispatch({
        type: ELIMINAR,
        payload: id,
      });
      alerta("success", "Montaje eliminado con exito!");
    } catch (error) {
      console.log(error);
      alerta("error", `'Ocurrió un error al intentar eliminar el montaje. ${error}`);
    }
  };

  return (
    <EemmContext.Provider
      value={{
        eemmList: state.eemmList,
        eemmActual: state.eemmActual,
        eemmUnidad: state.eemmUnidad,
        eemmEsn: state.eemmEsn,

        eemmDefault,
        eemm,
        setEemm,

        obtenerEemmEsnlist,
        obtenerEemmUnidadlist,
        obtenerEemmlist,
        obtenerEemm,
        registrarEemm,
        actualizarEemm,
        eliminarEemm,
      }}>
      {props.children}
    </EemmContext.Provider>
  );
};