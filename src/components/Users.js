import { useContext, useState } from "react";
import { useEffect } from "react";
import api from "../Api";
import UserTable from "./UserTable";
import { UserContext } from "../context/UserContext";
import Alert from "../modals/AlertModal.js";
import Success from "../modals/SuccessModal.js";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myAlertGet, setMyAlertGet] = useState(false);
  const [myAlertPut, setMyAlertPut] = useState(false);
  const [myAlertDelete, setMyAlertDelete] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);


  const handleUpdate = async (user) => {
    try {
      await api.put("api/users/put", user);
    } catch (err) {
      if (err.response) {
        setMyAlertPut(true);
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      await api.delete("/api/users/" + userId);
      setSuccessDelete(true);
    } catch (err) {
      if (err.response) {
        setMyAlertDelete(true);
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    setToken(user.token);
  }, [user.token]);

  useEffect(() => {
    if (token === null) {
      return;
    }
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${user.token}`,
        };
        const response = await api.get("/api/users", { headers });
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          setTimeout(() => {
            setMyAlertGet(true);
            setLoading(false);
          }, 1000);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchUsers();
  }, [token, user.token, handleDelete, handleUpdate]);

  return (
    <div>
      <div
        className={`users ${
          myAlertGet || myAlertDelete || myAlertPut ? "blur-background" : ""
        }`}
      >
        <div className="not-found"></div>
        {loading ? (
          <div className="loader"> </div>
        ) : (
          <UserTable
            data={users}
            onMakeAdmin={handleUpdate}
            onDeleteUser={handleDelete}
          />
        )}
      </div>
      {myAlertGet && (
        <Alert message={"Sorry, the system could not load the users."} />
      )}
      {myAlertPut && (
        <Alert message={"Sorry, the system could not update the user."} />
      )}
      {myAlertDelete && (
        <Alert message={"Sorry, the system could not delete the user."} />
      )}
      {successDelete && (
        <Success
          message={"Successfully deleted."}
          onClose={() => setSuccessDelete(false)}
        />
      )}
    </div>
  );
};

export default Users;
