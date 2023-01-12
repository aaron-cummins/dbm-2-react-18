import { useState } from "react";

const useValidacionForm = () => {
  const [error, setError] = useState([]);

  const validarTexto = (campo, valor, mensaje) => {
    if (!valor.trim()) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarNumero = (campo, valor, mensaje) => {
    if (!valor || valor === 0 || isNaN(valor)) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const validarSelect = (campo, valor, mensaje) => {
    if (!valor || parseInt(valor.id) === 0 || isNaN(valor.id)) {
      addError(campo, valor, mensaje);
      return true;
    } else {
      removerError(campo);
      return false;
    }
  };

  const removerError = (campo) => {
    setError((current) => {
      const copia = { ...current };
      delete copia[campo];
      return copia;
    });
  };

  const addError = (campo, value, mensaje) => {
    setError((current) => {
      const copia = { ...current };
      copia[campo] = mensaje ? mensaje : value ? value : "Campo requerido";
      return copia;
    });
  };

  return { validarTexto, validarNumero, validarSelect, error, setError };
};

export default useValidacionForm;
