import axios from "axios";

//const API_URL = "http://localhost:3309/";
const API_URL = "http://localhost:3000/api/";

export const registerNewUserCall = async () => {};
// return await axios.post(`${API_UR}auth/register`, credencials) ;

export const loginCall = async (credentials) => {
  return await axios.post(`${API_URL}auth/login`, credentials);
};

//CRUD methods
// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})
