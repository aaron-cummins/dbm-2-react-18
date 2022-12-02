import React, { useEffect, useContext, useState } from "react";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import {
  getUsuarioLugaresTrabajoList,
  getUsuarioLugarTrabajo,
} from "utilities/Login_utiles";
import Label from "../Forms/Label";

const SelectLugarTrabajo = (props) => {
  const { lugarTrabajoSelected } = useStateContext();
  const { lugarTrabajoList } = useContext(SelectsContext);
  const [lugaresTrabajo, setLugaresTrabajo] = useState([]);
  const [lugarTrabajoActual, setLugarTrabajoActual] = useState(0);

  useEffect(() => {
    let lta = getUsuarioLugarTrabajo();
    setLugarTrabajoActual(lta);
    let lug_trabajos = [];

    let LTrabajoUser = getUsuarioLugaresTrabajoList();

    if (lugarTrabajoList.length > 0) {
      setLugaresTrabajo([]);

      LTrabajoUser.LugarTrabajo.map((item) => {
        return lug_trabajos.push(
          lugarTrabajoList?.find((obj) => {
            return obj.id === item.lugar_trabajo_id ? obj : null;
          })
        );
      });
    }

    setLugaresTrabajo([...new Set(lug_trabajos)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label>
        Lugar de trabajo{" "}
        {props.required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <select
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-label="Select LugarTrabajo"
        required={props.required}>
        {lugaresTrabajo?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectLugarTrabajo;
