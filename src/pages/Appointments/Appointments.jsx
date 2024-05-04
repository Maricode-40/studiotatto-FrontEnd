import "./Appointments.css";
import { useState } from "react";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const Appointments = () => {
  const [appointments, setAppointments] = useState(Date());
  const [selected, setSelected] = useState();

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
    </>
  );
};
