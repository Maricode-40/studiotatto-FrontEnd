import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useEffect } from "react";
import {
  bringUsersAppointments,
  createUserAppointments,
  editAppointmentCall,
  deleteAppointments,
} from "../../services/apiCalls";
import "./AppointmentUserProfile.css";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";

export const AppointmentUserProfile = () => {
  const [userApps, setUserApps] = useState({
    appointmentDate: "",
    userId: "",
    serviceId: "",
  });

  const [appoints, setAppoints] = useState(Date());
  const [selected, setSelected] = useState();
  const [appointmentId, setAppointmentId] = useState([""]);
  //we store them and then we retrieve/recall the appointments.
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [citas, setCitas] = useState([]);

  // we get the data from Redux
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userId = userReduxData.decodificado.userId;

  const inputHandlerDates = (e) => {
    //console.log(typeof e.target.value, e.target.name);
    setUserApps((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dateCreation = async () => {
    try {
      const res = await createUserAppointments(userApps, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //console.log("holassss ");
    if (citas.length === 0) {
      const fetchAppointments = async () => {
        try {
          console.log(token);
          const fetched = await bringUsersAppointments(userId, token);
          console.log(fetched.appointments);
          setCitas(fetched.appointments);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      console.log(citas);
    }
  }, [appointmentId]);

  const deleteApps = async (id) => {
    const res = await deleteAppointments(id, token);
    console.log(res);
  };

  // Función que inicia el borrado del appointment y muestra u oculta el botón de confirmación
  const deleteAppointmentStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };

  const updateProfileHandler = () => {
    if (
      !IsInputError(userApps.firstName, "name") ||
      !IsInputError(userApps.email, "email")
    ) {
      //console.log("nombre o email no válidos");
      setErrorMessage("No se pueden actualizar los datos");
      return;
    }
    try {
      editAppointmentCall(userApps, token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="first">
        Actual date: {dayjs(appoints).format("dddd, MMMM D, YYYY h:mm A")}
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(e) =>
          setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
        }
      />
      <div className="second">
        {selected && <div> Selected date: {selected}</div>}
      </div>

      <CustomInput
        typeProp="date"
        nameProp="appointmentDate"
        placeholderProp="AppointmentDate"
        handlerProp={(e) => inputHandlerDates(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <CustomInput
        typeProp="number"
        nameProp="userId"
        placeholderProp="userId"
        handlerProp={(e) => inputHandlerDates(e)}
        onBlur={(e) => onBlurHandler(e)}
      />

      <CustomInput
        typeProp="number"
        nameProp="serviceId"
        placeholderProp="serviceId"
        handlerProp={(e) => inputHandlerDates(e)}
        onBlur={(e) => onBlurHandler(e)}
      />
      <h4>Create Appointments</h4>
      <button onClick={() => dateCreation(userApps)}>Create</button>
      <div className="userNewApps">
        {citas.length > 0 ? (
          <ul>
            {citas.map((appoints) => {
              return (
                <div key={appoints.id}>
                  <td>
                    <p className="text-muted mb-0"> {appoints.id} </p>
                    <td>
                      <p className="text-muted mb-0">
                        {appoints.appointmentDate}
                      </p>
                    </td>
                    <p className="text-muted mb-0"> {appoints.userId}user</p>
                    <tr>
                      <div
                        className="delete-button"
                        onClick={() => deleteAppointmentStepOne(appoints.id)}
                      ></div>
                      <div
                        className={
                          areYouDeletingMe === appoints.id
                            ? "delete-button confirm-delete "
                            : "delete-button confirm-delete display-none"
                        }
                        onClick={() => deleteApps(appoints.id)}
                      ></div>
                    </tr>
                  </td>
                </div>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
};
