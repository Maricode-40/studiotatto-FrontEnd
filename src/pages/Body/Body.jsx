import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Register } from "../Register/Register";
import { Profiles } from "../Profiles/Profiles";
import { AdministratorProfile } from "../AdministratorProfile/AdministratorProfile";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdministratorProfile />} />
      </Routes>
    </>
  );
};
