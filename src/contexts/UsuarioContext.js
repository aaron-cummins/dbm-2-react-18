import React, { createContext, useReducer, useState } from 'react';
import { OBTENER, OBTENER_LISTA, REGISTRAR, ACTUALIZAR, ELIMINAR } from '../const/actionTypes';
import usuarioReducer from '../reducer/usuarioReducer';
import axios from 'axios';
import useFetchAndLoad from '../hooks/useFetchAndLoad';

export const UsuarioContext = createContext();

export const UsuarioContextProvider = props => {
    const { loading , callEndpoint } = useFetchAndLoad();

    const initialState = {
        usuarioList: [],
        usuarioActual: null
    }

    const [state, dispatch] = useReducer(usuarioReducer, initialState);

    const obtenerUsuarios = async (correo) => {
        try {
            const resultado = await callEndpoint()

            dispatch({
                type: OBTENER_LISTA,
                payload: resultado.data
            });    
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <UsuarioContext.Provider 
            value={{
                usuarioList: state.usuarioList,
                usuarioActual: state.usuarioActual,

                obtenerUsuarios,
                /*registrarUsuario,
                obtenerUsuario,
                actualizarUsuario,
                eliminarUsuario*/
            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
}