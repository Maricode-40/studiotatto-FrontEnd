import { useSelector } from "react-redux";
import { getUserData } from "../userSlice";
import { useEffect, useState } from "react";
import { bringAllUsersCall, deleteUserById } from "../../services/apiCalls";
import "./AdministratorProfile.css";

export const AdministratorProfile = () => {
  const [users, setUsers] = useState([]);
  const [areYouDeletingMe, setAreYouDeletingMe] = useState([null]);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    console.log("ehhyyyyy");
    const fetchUsers = async () => {
      const res = bringAllUsersCall(token);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    console.log(res);
  };

  // initiates the deletion of the user and shows or hides the confirmation button
  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => {
            return (
              <li key={user._id} className="flex-row">
                {user.firstName} {user.email} {user.role}
                <div
                  className="delete-button"
                  onClick={() => deleteUserStepOne(user._id)}
                ></div>
                <div
                  className={
                    areYouDeletingMe === user._id
                      ? "delete-button confirm-delete "
                      : "delete-button confirm-delete display-none"
                  }
                  onClick={() => deleteUser(user._id)}
                ></div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
};
