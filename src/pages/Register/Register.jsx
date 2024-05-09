import "./Register.css";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useState } from "react";
import { registerNewUserCall } from "../../services/apiCalls";
import { inputValidator } from "../../utils/validators";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
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
    //console.log(credentials);

    if (
      inputValidator(credentials.firstName, "firstName") &&
      inputValidator(credentials.password, "password")
    ) {
      const answer = await registerNewUserCall(credentials);
      //console.log(answer);
      setMsg(answer.data.message);

      if (answer.data.message) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } else {
      console.log("try again bad credentials");
    }
  };

  return (
    <div className="register-container registerElementsDesign">
      {msg === "" ? (
        <>
          <h1 className="pt-4 text-black text-center">
            Welcome to Tatto Studio App
          </h1>
          <CustomInput
            typeProp={"text"}
            nameProp={"firstName"}
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
            title={"Register Now!"}
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
