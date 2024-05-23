export const MyInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled,
  // isValidContent
}) => {
  // props, properties we get as an object
  return (
    <input
      className={"InputDesign"}
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value || ""}
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}
    ></input>
  );
};
