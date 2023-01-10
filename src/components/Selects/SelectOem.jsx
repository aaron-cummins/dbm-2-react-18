import { useContext } from "react";
import { SelectsContext } from "contexts/SelectsContext";
import Label from "../Forms/Label";

const SelectOem = (props) => {
  const { oemsList, styleSetect, styleErrorSelect } = useContext(SelectsContext);

  return (
    <>
      <Label>Oem {props.required ? <b className="text-red-500"> * </b> : ""}</Label>
      <select
        className={`${styleSetect} ${props.error ? "border border-red-500" : ""}`}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-label="Select Oem"
        required={props.required}>
        <option defaultValue="00" key="00">
          Seleccione un Oem
        </option>
        {oemsList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
      {props.error ? <span className={styleErrorSelect}>{props.error}</span> : null}
    </>
  );
};

export default SelectOem;
