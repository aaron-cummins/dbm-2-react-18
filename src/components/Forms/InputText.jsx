import Label from "./Label";

/* INPUT FORM */
const InputText = ({ id, name, placeholder, value, onChangeFN, required, label }) => {
  const classStyle =
    "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <>
      <Label>{label}</Label>
      <input
        type="text"
        className={classStyle}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFN}
        required={required}
      />
    </>
  );
};
export default InputText;
