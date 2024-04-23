//import "./Home.css";

import { useDispatch } from "react-redux";
import { decodeToken } from "react-jwt";
import { login } from "../userSlice";
import { bringAllUsersCall, loginCall } from "../../services/apiCalls";

export const Home = () => {
  const user = {
    email: "laray@yahoo.com",
    password: "password",
  };

  const superadmin = {
    email: "superadmin2@superadmin.com",
    password: "password",
  };

  const dispatch = useDispatch();

  const loginMe = async (role) => {
    console.log(role);
    const answer = await bringAllUsersCall(role);

    if (answer.data.token) {
      const uDecodificado = decodeToken(answer.data.token);
      const passport = {
        token: answer.data.token,
        decodificado: uDecodificado,
      };
      dispatch(login(passport));
      console.log(passport);
    }
  };
  return (
    <>
      <h1> 🀪 🀪 🀪 </h1>
      <h2>Welcome to My Studio Tatto</h2>
      <h3> 🀪 🀪 🀪 </h3>
      <div className="card">
        <button onClick={() => loginMe(user)}>Login as User </button>
        <button onClick={() => loginMe(superadmin)}>Login as SuperAdmin</button>
        <h3> 🏡 </h3>
      </div>
    </>
  );
};
