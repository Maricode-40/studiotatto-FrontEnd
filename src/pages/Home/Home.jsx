import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {}, [count]);

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);
  return (
    <>
      <h1> 🀪 🀪 🀪 </h1>
      <h2>Welcome to Studio Tatto App</h2>
      <div className="card">
        <button>Bring My Profile</button>
        <h3> 🏡 </h3>
        <CustomInput
          typeProp="email"
          nameProp="email"
          placeholderProp="Go to login and introduce your data"
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="password"
          nameProp="password"
          placeholderProp="and password"
          handlerProp={inputHandler}
        />
      </div>
    </>
  );
};
