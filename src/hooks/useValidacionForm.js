const useValidacionForm = (formulario) => {
  const validarTexto = (campo) => {
    if (!campo.trim()) return true;
    else return false;
  };

  const validarNumero = (campo) => {
    if (!campo || campo !== 0 || !isNaN(campo)) return true;
    else return false;
  };

  const validarSelect = (campo) => {
    if (!campo || campo.id === 0 || isNaN(campo.id)) return true;
    else return false;
  };

  return { validarTexto, validarNumero, validarSelect };
};

export default useValidacionForm;
