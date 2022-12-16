import React, { useEffect, useState, useContext, useMemo } from "react";
import { InputText, Buttons, Checkbox } from "components";
import { PostTratamientoContext } from "../context/PostTratamientoContext";
import { useStateContext } from "contexts/ContextProvider";
import { closeModal } from "utilities/Utiles";
import { useSnackbar } from "notistack";

const FormPostTratamiento = () => {
  const { PostTratamientoActual, registrarPostTratamiento, actualizarPostTratamiento, obtenerPostTratamiento } =
    useContext(PostTratamientoContext);
  const { mensaje } = useStateContext();
  const { enqueueSnackbar } = useSnackbar();

  const PostTratamientoDefault = useMemo(
    () => ({
      id: 0,
      nombre: "",
      activo: false,
    }),
    []
  );
  const [PostTratamiento, setPostTratamiento] = useState(PostTratamientoDefault);

  useEffect(() => {
    PostTratamientoActual ? setPostTratamiento(PostTratamientoActual) : setPostTratamiento(PostTratamientoDefault);
  }, [PostTratamientoActual, PostTratamientoDefault]);

  const handleChange = (e) => {
    e.target.name === "activo"
      ? setPostTratamiento({
          ...PostTratamiento,
          [e.target.name]: e.target.checked,
        })
      : setPostTratamiento({
          ...PostTratamiento,
          [e.target.name]: e.target.value,
        });
  };

  const limpiaForm = () => {
    setPostTratamiento(PostTratamientoDefault);
    obtenerPostTratamiento(null);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    PostTratamientoActual
      ? actualizarPostTratamiento(PostTratamientoEnviar())
      : registrarPostTratamiento(PostTratamientoEnviar());
    limpiaForm();
    closeModal();
  };

  const PostTratamientoEnviar = () => {
    let PostTratamientoTmp = { ...PostTratamiento };
    return PostTratamientoTmp;
  };

  return (
    <form onSubmit={handleOnSubmit}>
      {mensaje.mensaje ? enqueueSnackbar(mensaje.mensaje, { variant: mensaje.tipoAlerta }) : null}
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-8">
          <InputText
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            label="Nombre"
            value={PostTratamiento.nombre}
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
            checked={PostTratamiento.activo}
          />
        </div>
      </div>
      <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <Buttons cancelFN={() => limpiaForm()} />
      </div>
    </form>
  );
};

export default FormPostTratamiento;
