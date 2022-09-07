import React, { createContext, useReducer, useState } from 'react';
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR, OBTENER_LISTA_ACTIVAS } from '../const/actionTypes';
import { getList, getByID, postObject, putObject, deleteObject } from '../services/genericService';
import lugartrabajoReducer from '../reducer/lugarTrabajoReducer';
import useFetchAndLoad from '../hooks/useFetchAndLoad';

export const LugarTrabajoContext = createContext();

export const LugarTrabajoContextProvider = props => {
    const { loading , callEndpoint } = useFetchAndLoad();
    const urlApi = 'lugartrabajo';
    const initialState = {
        lugartrabajoList: [],
        regionListActiva: [],
        lugartrabajoActual: null
    }

    const [state, dispatch] = useReducer(lugartrabajoReducer, initialState);
    const [mensaje, SetMensaje] = useState(null);
    const [tipoAlerta, SetTipoAlerta] = useState(null);

    /* Muestra alerta y la destruye a los 5 segundos */
    const alerta = (tipoAlerta, mensaje) => {
        
        SetMensaje(mensaje);
        SetTipoAlerta(tipoAlerta);

        setTimeout(() => {
            SetMensaje(null);
            SetTipoAlerta(null);    
        }, 5000);
    }

    /* OBETENER LISTADO DE REGIONES ACTIVAS */
    const obtenerRegionesActivas = async () => {
        try {
            const resultado = await callEndpoint(getList('region'));
            if(resultado && resultado.data){
                let RegionActivas = [];
                resultado.data.map((item) => {
                    item.activo && RegionActivas.push(item);
                });
                
                dispatch({
                    type: OBTENER_LISTA_ACTIVAS,
                    payload: RegionActivas
                });    
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    /* OBETENER LISTADO DE LUGARTRABAJOS */
    const obtenerLugaresTrabajo = async () => {
        try {
            const resultado = await callEndpoint(getList(urlApi));
            if(resultado && resultado.data){
                dispatch({
                    type: OBTENER_LISTA,
                    payload: resultado.data
                });    
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    /* OBTENER UNA LUGARTRABAJO */
    const obtenerLugarTrabajo = async (lugartrabajo) => {
        try {

            let lugartrabajoEncontrada = null;
            if(lugartrabajo !== null){
                const resultado = await callEndpoint(getByID(urlApi,lugartrabajo.id));
                if(resultado && resultado.data){
                    lugartrabajoEncontrada = resultado.data                    
                }
            }else{
                lugartrabajoEncontrada = lugartrabajo;        
            }

            dispatch({
                type: OBTENER,
                payload: lugartrabajoEncontrada
            });    
        } catch (error) {
            console.log(error);
        }
    }

    /* REGISTRAR LUGARTRABAJO */
    const registrarLugarTrabajo = async lugartrabajo => {
        try {
            const resultado = await callEndpoint(postObject(urlApi, lugartrabajo));
            dispatch({
                type: REGISTRAR,
                payload: resultado.data
            }); 
            alerta('success', 'Lugar de Trabajo creado con exito!');
        } catch (error) {
            console.log(error);
            alerta('danger', `'Ocurrió un error al intentar crear el lugar de trabajo. ${error}`);
        }
        
    }

    /* ACTUALIZAR LUGARTRABAJO */
    const actualizarLugarTrabajo = async lugartrabajo => {
        try {
            const resultado = await callEndpoint(putObject(urlApi, lugartrabajo));
            dispatch({
                type: ACTUALIZAR,
                payload: resultado.data
            });   
            alerta('success', 'Lugar de Trabajo actualizado con exito!');
        } catch (error) {
            console.log(error);
            alerta('danger', `'Ocurrió un error al intentar actualizar el lugar trabajo. ${error}`);
        }
    }

    /* ELIMINAR LUGARTRABAJO */
    const eliminarLugarTrabajo = async id => {
        try {
            const resultado = await callEndpoint(deleteObject(urlApi, id));
            dispatch({
                type: ELIMINAR,
                payload: id
            }); 
            alerta('success', 'Lugar de Trabajo eliminado con exito!');
        } catch (error) {
            console.log(error);
            alerta('danger', `'Ocurrió un error al intentar eliminar el lugar de trabajo. ${error}`);
        }
        
    }

    return (
        <LugarTrabajoContext.Provider 
            value={{
                lugartrabajoList: state.lugartrabajoList,
                lugartrabajoActual: state.lugartrabajoActual,
                regionListActiva: state.regionListActiva,

                obtenerLugaresTrabajo,
                obtenerLugarTrabajo,
                registrarLugarTrabajo,
                actualizarLugarTrabajo,
                eliminarLugarTrabajo,
                obtenerRegionesActivas,

                mensaje, SetMensaje,
                tipoAlerta, SetTipoAlerta
            }}
        >
            {props.children}
        </LugarTrabajoContext.Provider>
    );
}