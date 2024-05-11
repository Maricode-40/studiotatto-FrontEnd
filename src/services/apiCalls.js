import axios from "axios";

//const API_URL = "http://localhost:3309/";
const API_URL = "http://localhost:3000/api/";

export const registerNewUserCall = async (credentials) => {
  console.log(credentials);
  return await axios.post(`${API_URL}auth/register`, credentials);
};

export const loginCall = async (credentials) => {
  //console.log(credentials, "soy credencials en loginCall");
  const res = await axios.post(`${API_URL}auth/login`, credentials);
  //console.log(res);
  return res;
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}users/profile`, config);
  console.log(res, "bringprofile");
  return res.data;
};

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(data);
  const res = await axios.put(`${API_URL}users/profile`, data, config);
  console.log(res, "hey there!! i am an updated Profile");
  return res;
};

export const bringAllUsersCall = (token) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${API_URL}users`, config);
};

export const deleteUserById = (id, token) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}users/${id}`, config);
};

//BRING ALL APPOINTMENTS AS ADMIN- all good and  tested
export const bringAppointments = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}users/${id}/appointments`, config);
  console.log(res);
  return res.data;
};

//CREATE APPOINTMENTS AS ADMIN
export const appointmentCreate = async (appsDate, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //console.log(appsDate, "any admin date created?");
  const res = await axios.post(`${API_URL}appointments`, appsDate, config);
  //console.log(config, "Admincall");
  return res;
};

//for user clients creation
export const createUserAppointments = async (userApps, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(userApps, "any date created?");
  const res = await axios.post(
    `${API_URL}users/appointments`,
    userApps,
    config
  );
  console.log(config, "AY WEYYY");

  return res;
};
//update appointments for users  needs to be fixed
export const editAppointmentCall = async (userApps, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(userApps, "any date created?");
  const res = await axios.put(`${API_URL}appointments/${id}`, userApps, config);
  return res;
};

//bring client appointments
export const bringUsersAppointments = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(`${API_URL}users/${id}/appointments`, config);
  console.log(res);
  return res.data;
};

//delete appointment for users clients needs to be fixed
export const deleteAppointments = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(`${API_URL}appointments/${id}`, config);
  return res;
};

// HOME-about user profile
// export const getALLBLABLABL-CRUD methods
// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})
