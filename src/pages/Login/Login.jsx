import React from "react";
import tatoo1 from "../../assets/images/tatoo1.gif";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useState } from "react";
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
import { inputValidator } from "../../utils/validators";

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  // useState que lleva la cuenta del formato de los inputs y si el contenido es válido
  const [isValidContent, setIsValidContent] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    //this function is going to bind the state hook that is credentials
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.name);
    setIsValidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
  };

  const loginMe = async () => {
    try {
      //this function is going to  trigger the login
      const answer = await loginCall(credentials);
      //console.log(answer);
      if (answer.data.token) {
        const uDecodificado = decodeToken(answer.data.token);

        const passport = {
          token: answer.data.token,
          decodificado: uDecodificado,
        };

        dispatch(login(passport));

        console.log(passport);

        setMsg(`${uDecodificado.firstName}, Welcome back .`);

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        setLoginError("server is down");
      } else {
        setLoginError(error.response.data.error);
      }
    }
  };

  return (
    <div className="login-container loginElementsDesign">
      {msg === "" ? (
        <>
          <img src={tatoo1} alt="Tatoo hands" /> {""}
          <CustomInput
            isValidContent={isValidContent.email}
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe tu e-mail"}
            // función que se dispara al clickar fuera del input y valida el contenido
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.email}
          />
          <CustomInput
            isValidContent={isValidContent.password}
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe el password"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.password}
          />
          <ButtonC
            title={"log me!"}
            className={"regularButtonClass"}
            functionEmit={loginMe}
          />
          <h2>{loginError}</h2>
        </>
      ) : (
        <div>{msg}</div>
      )}
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
    </div>
  );
};
