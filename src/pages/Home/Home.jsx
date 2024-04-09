import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";

export const Home = () => {
  const [count, setCount] = useState(0);
  const [inputData, setInputData] = useState("");

  const addCountButtonHandler = () => {
    setCount(count + 1);
  };

  const inputHandler = (e) => {
    setInputData(e.target.value);
    console.log(e);
  };

  useEffect(() => {}, [count]);
  return (
    <>
      <h1>SOY HOME</h1>
      <h2>Hola subtitulos </h2>

      <div className="card">
        <button onClick={addCountButtonHandler}>count is {count}</button>
        <input
          type="text"
          name="inputDeTest" // en un futuro se puede cambiar a username
          onChange={(e) => inputHandler(e)}
        ></input>
        <CustomInput
          typeProp="email"
          nameProp="password"
          placeholderProp="Go to your Login or Register first "
          handlerProp={inputHandler}
        />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};
