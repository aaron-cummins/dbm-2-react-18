import { useContext } from "react";
import { SelectsContext } from "contexts/SelectsContext";
import Label from "../Forms/Label";

const SelectFlota = (props) => {
  const { flotasLugarTrabajoList, styleSetect, styleErrorSelect } = useContext(SelectsContext);

  return (
    <>
      <Label>Flota {props.required ? <b className="text-red-500"> * </b> : ""}</Label>
      <select
        className={`${styleSetect} ${props.error ? "border border-red-500" : ""}`}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-label="Select Flota"
        required={props.required}>
        <option defaultValue="00" key="00">
          Seleccione una Flota
        </option>
        {flotasLugarTrabajoList.map((item) => (
          <option key={item.id} value={item.flotas.id}>
            {item.flotas.nombre}
          </option>
        ))}
      </select>
      {props.error ? <span className={styleErrorSelect}>{props.error}</span> : null}
    </>
  );
};

export default SelectFlota;
