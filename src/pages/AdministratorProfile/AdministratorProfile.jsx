import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useEffect } from "react";

export const AdministratorProfile = () => {
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {});

  return (
    <>
      <div>soy admin</div>
    </>
  );
};
