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
      <h1>SOY HOME</h1>
      <h2>Este es el subtítulo</h2>
      <div className="card">
        <button>Bring My Profile</button>
        <h3>homeee</h3>
        <CustomInput
          typeProp="email"
          nameProp="email"
          placeholderProp="introduce tu email"
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="password"
          nameProp="password"
          placeholderProp=""
          handlerProp={inputHandler}
        />
      </div>
    </>
  );
};
