import React, { useEffect, useContext, useState } from "react";
import { LugarTrabajoContext } from "../../contexts/LugarTrabajoContext";
import {
  getUsuarioLugaresTrabajoList,
  getUsuarioLugarTrabajo,
  setUsuarioLugarTrabajo,
} from "../../utilities/Login_utiles";

const SelectLugarTrabajo = (props) => {
  const { lugartrabajoList } = useContext(LugarTrabajoContext);
  const [lugaresTrabajo, setLugaresTrabajo] = useState([]);
  const [lugarTrabajoActual, setLugarTrabajoActual] = useState(0);

  useEffect(() => {
    setLugarTrabajoActual(getUsuarioLugarTrabajo());
    let LTrabajoUser = getUsuarioLugaresTrabajoList();

    if (lugartrabajoList.length > 0) {
      setLugaresTrabajo([]);
      LTrabajoUser.LugarTrabajo.map((item) => {
        return lugaresTrabajo.push(
          lugartrabajoList?.find((obj) => {
            return obj.id === item;
          })
        );
      });
    }
    setLugaresTrabajo(lugaresTrabajo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <select
          className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="lugar_trabajo_global"
          name="lugar_trabajo_global"
          value={lugarTrabajoActual}
          onChange={props.onChangeFN}
          aria-label="Select LugarTrabajo">
          {lugaresTrabajo?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectLugarTrabajo;
