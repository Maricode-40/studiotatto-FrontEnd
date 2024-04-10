import "./Register.css";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useState } from "react";
import { registerNewUserCall } from "../../services/apiCalls";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    //this function is going to bind the state hook that is credentials
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerMe = async () => {
    const answer = await registerNewUserCall(credentials);
    setMsg(answer.data.message);
    //console.log(answer);
    if (answer.data.message) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="register-container registerElementsDesign">
      {msg === "" ? (
        <>
          <CustomInput
            typeProp={"text"}
            nameProp={"name"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"enter your first Name"}
          />
          <CustomInput
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"enter your e-mail"}
          />

          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"enter your password"}
          />

          <ButtonC
            title={"reister!"}
            className={"regularButtonClass"}
            functionEmit={registerMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
    </div>
  );
};
