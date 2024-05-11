import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useEffect } from "react";
import {
  bringUsersAppointments,
  createUserAppointments,
} from "../../services/apiCalls";
import "./AppointmentUserProfile.css";

export const AppointmentUserCreate = () => {
  const [userApps, setUserApps] = useState({
    appointmentDate: "",
    userId: "",
    serviceId: "",
  });

  const [appointmentId, setAppointmentId] = useState([""]);

  // we get the data from Redux
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const userId = userReduxData.decodificado.userId;

  const [userappsi, setUserAppsi] = useState([""]);

  //handler - client side

  //   const clientHandler = (e) => {
  //     setSelectedClient(e.target.id);
  //     setAppointmentDate({
  //       ...appointmentData,
  //       client: e.target.id,
  //     });
  //     console.log(appointmentData);
  //   };
  //   const handlerProp = (e) => {
  //     setAppointmentId({
  //       ...appointmentId,
  //       [e.target.name]: e.target.value,
  //     });
  //     console.log(appointmentDate);
  //   };

  //handler TATUADOR
  //   const tatuadorHandler = (e) => {
  //     setSelectedtatuador(e.target.id);

  //     setAppointmentDate({
  //       ...appointmentDate,
  //       tatuador: e.target.id,
  //     });
  //     console.log(appointmentDate);
  //   };

  const userCreate = async () => {
    try {
      const res = await createUserAppointments(userApps, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //function to call api to edit a CLIENT appointment
  const editAppointmentCall = async () => {
    try {
      await editAppointmentCall(userApps, token);
      console.log("Cita editada");
    } catch (error) {
      console.log("Error editando cita:" + error);
    }
  };

  //handler to close the modal
  //   const handleClose = () => {
  //     setShow(false);
  //     setAreYouDeletingMe(null);
  //   };

  //handler to open modal
  //const handleShow = (appointmentId) => {
  //BIND THE selected appointment TO THE APPOINTMENT THAT WE SEND AS PARAMETER
  //setSelectedAppointment(appointment);

  //WILL BIND  appointmentDatE  WITH THE APPOINTMENT DATA WE SEND AS PARAMEtER
  // setAppointmentDate({
  //  id: appointment.id,
  // appoinntmentdate: appointment.appoinntmentdate,
  //  client: appointment.client.id,
  //  description: appointment.description,
  // tatuador: appointment.tatuador.id,
  // });

  //TO OPEN modal
  //     setShow(true);

  //     console.log(selectedAppointment);

  //     console.log(appointmentDate);
  //   };

  // Function- confirm-user deletion- show a confirmation button  or  not

  //   const deleteUserStepOne = (id) => {
  //     console.log(id);
  //     if (areYouDeletingMe === id) {
  //       setAreYouDeletingMe(null);
  //     } else {
  //       setShowDelete(true);
  //       setAreYouDeletingMe(id);

  //       console.log(areYouDeletingMe);
  //     }
  //   };

  useEffect(() => {
    console.log("holassss ");
    if (userappsi.length === 0) {
      const fetchAppointments = async () => {
        try {
          console.log(token);
          const fetched = await bringUsersAppointments(userId, token);
          console.log(fetched.appointments);
          setUserAppsi(fetched.appointments);
        } catch (error) {
          console.log(error);
        }
      };

      fetchAppointments();
      console.log(userappsi);
    }
  }, [appointmentId]);

  return (
    <>
      <button onClick={() => userCreate(userApps)}>Create</button>

      <div className="userNewApps">
        {userappsi.map((userappsi) => (
          <div key={userappsi}>
            <h1 className="appsNumber"> User- ID: {userappsi.id} </h1>

            <h2 className="listApps">
              Appointment Date: {userappsi.appointmentDate}
            </h2>
            <h3 className="userSearch">
              Type Of Service - {userappsi.serviceId}
            </h3>
          </div>
        ))}
        {/* 
        <div className="col-md-6">
                      <ButtonC
                        title={"Eliminar"}
                        className={"regularButtonClass"}
                        functionEmit={() => {
                          deleteUserStepOne(element.id);
                          console.log(element);
                        }}
                      />
                    </div>

        <BootstrapModal
          appointmentId={userApps.id}
          //show={show}
          handleClose={handleClose}
          handlerProp={handlerProp}
          filteredAppointments={filteredAppointments}
          appointmentFilterHandler={appointmentFilterHandler}
          //clientFilterHandler={clientFilterHandler}
          //selected={selected}
          //msg={msg}
          userData={userData}
          editAppointment={editAppointment}
          clientHandler={clientHandler}
          FilterHandler={artistHandler}
        ></BootstrapModal> */}
      </div>
    </>
  );
};
