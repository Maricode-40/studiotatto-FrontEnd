import { bringProfile } from "../../services/apiCalls";
import { useState, useEffect } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { inputValidator } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedAmount, getUserData, resetCount } from "../userSlice";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";

export const Profiles = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const veces = useSelector(getLoggedAmount);
  const myPassport = useSelector(getUserData);
  const token = myPassport.token;

  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(token);
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  const updateProfileHandler = () => {
    if (
      !inputValidator(profileData.name, "name") ||
      !inputValidator(profileData.email, "email")
    ) {
      console.log("nombre o email no válidos");
      setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      updateProfile(profileData, token);
    } catch (err) {
      console.log(err);
    }
  };

  const resetLoggedCount = () => {
    console.log(veces);
  };

  return (
    <>
      <CustomInput
        typeProp="text"
        nameProp="name"
        placeholderProp="name"
        value={profileData.name}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <CustomInput
        typeProp="text"
        nameProp="role"
        placeholderProp="role"
        value={profileData.role}
        isDisabled="disabled"
        handlerProp={inputHandler}
      />
      {isEditing ? (
        <div className="button-container">
          <button onClick={() => updateProfileHandler()}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <>
          <button onClick={() => resetLoggedCount()}>Modificar</button>
          <BootstrapModal
            profileData={profileData}
            inputHandler={inputHandler}
            token={token}
          />
        </>
      )}
    </>
  );
};
