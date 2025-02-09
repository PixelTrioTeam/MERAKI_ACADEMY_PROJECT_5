import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../service/redux/reducers/users/usersSlice";
import axios from "axios";
import "./dashAdmin.css";
import { useEffect } from "react";

const DashAdmin = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/")
      .then((res) => {
        console.log(res.data.result);

        dispatch(setUsers(res.data.result));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.role_id === "1" ? "Admin" : "User"}</td>{" "}
              
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashAdmin;
