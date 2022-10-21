import React, { useEffect, useContext, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { SelectsContext } from "../../contexts/SelectsContext";
import {
  getUsuarioLugaresTrabajoList,
  getUsuarioLugarTrabajo,
} from "../../utilities/Login_utiles";
import Label from "../Forms/Label";

const SelectLugarTrabajo = (props) => {
  const { lugarTrabajoSelected } = useStateContext();
  const { lugarTrabajoList } = useContext(SelectsContext);
  const [lugaresTrabajo, setLugaresTrabajo] = useState([]);
  const [lugarTrabajoActual, setLugarTrabajoActual] = useState(0);

  useEffect(() => {
    let lta = getUsuarioLugarTrabajo();
    setLugarTrabajoActual(lta);

    let LTrabajoUser = getUsuarioLugaresTrabajoList();

    if (lugarTrabajoList.length > 0) {
      setLugaresTrabajo([]);

      LTrabajoUser.LugarTrabajo.map((item) => {
        return lugaresTrabajo.push(
          lugarTrabajoList?.find((obj) => {
            return obj.id === item;
          })
        );
      });
    }
    setLugaresTrabajo(lugaresTrabajo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Label>Lugar de trabajo</Label>
      <select
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="lugar_trabajo_global"
        name="lugar_trabajo_global"
        value={lugarTrabajoSelected}
        onChange={props.onChangeFN}
        aria-label="Select LugarTrabajo">
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
