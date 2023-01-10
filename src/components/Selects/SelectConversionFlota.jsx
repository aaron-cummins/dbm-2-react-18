import { useContext } from "react";
import { SelectsContext } from "contexts/SelectsContext";
import Label from "../Forms/Label";

const SelectConversionFlota = (props) => {
  const { conversionFlotaList } = useContext(SelectsContext); 

  return (
    <>
      <Label>
        Conversión flota {props.required ? <b className="text-red-500"> * </b> : ""}
      </Label>
      <select
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        aria-label="Select ConversionFlota"
        required={props.required}>
        <option defaultValue="00" key="00">
          Seleccione una Conversión flota
        </option>
        {conversionFlotaList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nombre}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectConversionFlota;
