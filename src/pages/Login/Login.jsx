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

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    //this function is going to bind the state hook that is credentials
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginMe = async () => {
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

    

      setMsg(`${uDecodificado.name}, Welcome back .`);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="login-container loginElementsDesign">
      {msg === "" ? (
        <>
          <img src={tatoo1} alt="Tatoo hands" /> {""}
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
            title={"log me!"}
            className={"regularButtonClass"}
            functionEmit={loginMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
    </div>
  );
};
