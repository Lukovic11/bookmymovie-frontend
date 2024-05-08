import { useContext, useState } from "react";
import { useEffect } from "react";
import api from "../Api";
import UserTable from "./UserTable";
import { UserContext } from "../context/UserContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [token, setToken] = useState(null);

  const handleUpdate = async (user) => {
    try {
      user.role = "admin";
      await api.put("api/users/put", user);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }

    }
  }

  const handleDelete = async (userId) => {
    try {
      await api.delete("/api/users/" + userId);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  }

  useEffect(() => {
    setToken(user.token);
  }, [user.token])

  useEffect(() => {
    if (token === null) {
      return;
    }
    const fetchUsers = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${user.token}`
        };
        const response = await api.get("/api/users", { headers });
        setUsers(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchUsers();
  }, [token, user.token, handleDelete, handleUpdate])


  return (
    <div className="users">
      <div className='not-found'></div>
      <UserTable data={users} onMakeAdmin={handleUpdate} onDeleteUser={handleDelete} />
    </div>
  );
}

export default Users;