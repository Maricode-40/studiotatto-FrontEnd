import "./CustomInput.css";

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled,
}) => {
  // props = properties. Properties, are received as an object.
  return (
    <input
      className="customInputDesign"
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value}
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}
    />
  );
};

// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />
