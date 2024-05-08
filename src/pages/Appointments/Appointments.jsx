import "./Appointments.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getUserData } from "../userSlice";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { appointmentCreate } from "../../services/apiCalls";
import { bringAppointments } from "../../services/apiCalls";


export const Appointments = () => {
  const [appsDate, setAppsDate] = useState({
    appointmentDate: "",
    userId: "",
    serviceId: "",
  });

  const [appointments, setAppointment] = useState(Date());
  const [selected, setSelected] = useState();
  const [appointmentId, setAppointmentId] = useState([""]);

  //we store them and then we retrieve/recall the appointments.
  const [citas, setCitas] = useState([]);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userId = userReduxData.decodificado.userId;

  const dateCreation = async () => {
    try {
      const res = await appointmentCreate(appsDate, token);
      console.log(res.appsDate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //console.log("holassss ");
    if (citas.length === 0) {
      const fetchAppointments = async () => {
        try {
          //console.log(token);
          const fetched = await bringAppointments(userId, token);
          //console.log(fetched.appointments);
          setCitas(fetched.appointments);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      // console.log(citas);
    }
  }, [appointmentId]);

  return (
    <>
      <div className="first">
        Actual date: {dayjs(appointments).format("dddd, MMMM D, YYYY h:mm A")}
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(e) =>
          setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
        }
      />
      <div className="second">
        {selected && <div> Selected date: {selected}</div>}{" "}
      </div>
      <button onClick={() => dateCreation(appsDate)}>Create</button>

      <div className="appointsDesign">
        {citas.map((cita) => (
          <div key={cita.id}>
            <h1 className="appsNumber"> User- ID: {cita.id} </h1>

            <h2 className="listApps">
              Appointment Date: {cita.appointmentDate}
            </h2>
            <h3 className="userSearch"> Type Of Service - {cita.serviceId}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
