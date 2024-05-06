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

  const [citas, setCitas] = useState([]);
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userId = userReduxData.decodificado.userId;

  const dateCreation = async () => {
    try {
      const res = await appointmentCreate(appsDate, token);
      console.log(res);
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
          console.log(fetched);
          setCitas(fetched.data.appointments);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      console.log(citas);
    }
  }, [appointmentId]);

  return (
    <>
      <div>
        Actual date: {dayjs(appointments).format("dddd, MMMM D, YYYY h:mm A")}
      </div>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(e) =>
          setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
        }
      />
      <div>{selected && <div> Selected date: {selected}</div>} </div>

      <button onClick={() => dateCreation(appsDate)}>Create</button>

      <div className="appointsDesign">
        {appointmentId.map((appointmentDate) => (
          <div key={appointmentDate.id}></div>
        ))}
      </div>
      <h1></h1>
    </>
  );
};
