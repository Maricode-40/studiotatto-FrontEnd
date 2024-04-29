import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useEffect, useState } from "react";
import { bringAllUsersCall, deleteUserById } from "../../services/apiCalls";
import "./AdministratorProfile.css";

export const AdministratorProfile = () => {
  const [users, setUsers] = useState([]);
  //const [areYouDeletingMe, setAreYouDeletingMe] = useState([null]);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    //console.log("ayWeEeyyyyY");
    const fetchUsers = async () => {
      const res = await bringAllUsersCall(token);
      //console.log(res, "hola");
      setUsers(res.data.users);
      //console.log(typeof users);
    };
    if (users.length === 0) {
      fetchUsers();
    }
  }, [users]);

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    console.log(res);
  };

  // initiates the deletion of the user and shows or hides the confirmation button
  //const deleteUserStepOne = (id) => {
  //  if (areYouDeletingMe === id) {
  //   setAreYouDeletingMe(null);
  //  } else {
  //    setAreYouDeletingMe(id);
  //   }
  //  };

  return (
    <>
      <p>Total number of users: {Array.isArray(users) ? users.length : 0}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((users) => (
              <tr key={users.id}>
                <td> {users.id}</td>
                <td>{users.firstName}</td>
                <td>{users.lastName}</td>
                <td>{users.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="deleteButton" onClick={() => deleteUser(users.id)}></div>
      <div
        className="upgradeButton"
        onClick={() => fetchProfile(users.id)}
      ></div>
    </>
  );
};
