import { useContext } from "react";
import { SelectsContext } from "contexts/SelectsContext";
import Label from "../Forms/Label";

const Select = (props) => {
  const { styleSetect, styleErrorSelect } = useContext(SelectsContext);

  return (
    <>
      <Label>
        {props.label} {props.required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <select
        className={`${styleSetect} ${props.error ? "border border-red-500" : ""}`}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-label={`Select ${props.label}`}
        required={props.required}
        readOnly={props.readOnly ? props.readOnly : false}
        disabled={props.readOnly ? props.readOnly : false}>
        <option defaultValue="00" key="00">
          Seleccione un(a) {props.label}
        </option>
        {props.list?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
      {props.error ? <span className={styleErrorSelect}>{props.error}</span> : null}
    </>
  );
};

export default Select;
