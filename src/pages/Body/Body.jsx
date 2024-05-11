import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { About } from "../About/About";
import { Register } from "../Register/Register";
import { Profiles } from "../Profiles/Profiles";
import { AdministratorProfile } from "../../pages/AdministratorProfile/AdministratorProfile";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { Appointments } from "../Appointments/Appointments";
import { AppointmentUserCreate } from "../../pages/Users/AppointmentUserProfile";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/superappointments" element={<Appointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/clientappointments" element={<AppointmentUserCreate />} />

        <Route
          path="/admin"
          element={<AdminRoute Component={AdministratorProfile} />}
        />
      </Routes>
    </>
  );
};
