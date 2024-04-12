import axios from "axios";

//const API_URL = "http://localhost:3309/";
const API_URL = "http://localhost:3000/api/";

export const registerNewUserCall = async (credentials) => {
  console.log(credentials);
  return await axios.post(`${API_URL}auth/register`, credentials);
};

export const loginCall = async (credentials) => {
  return await axios.post(`${API_URL}auth/login`, credentials);
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
  const res = await axios.put(`${API_URL}users/profile`, data, config);
  console.log(res, "hey there!! i am updateProfile");
  return res;
};

// HOME
// export const getALLBLABLABLA
//CRUD methods
// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})
