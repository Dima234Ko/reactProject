import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import {
  AddUserButton,
  ChangePassButton,
  DeleteUserButton,
} from "../../components/Button";
import { Loader } from "../../components/Loader";

function User() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const userData = [
      { login: "johndoe", fullname: "John Doe" },
      { login: "janesmith", fullname: "Jane Smith" },
      { login: "carlosg", fullname: "Carlos Garcia" },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(userData);
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getUserData();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = ["Логин", "Фамилия Имя Отчество"];

  const handleAddUser = () => {
    console.log("add user");
  };

  const handleChangePass = () => {
    console.log("change password");
  };

  const handleDeleteUser = () => {
    console.log("delete user");
  };

  return (
    <div id="user">
      <h2>Пользователи</h2>
      <div id="tableButton">
        <AddUserButton onClick={handleAddUser} />
        <ChangePassButton onClick={handleChangePass} />
        <DeleteUserButton onClick={handleDeleteUser} />
      </div>
      <div className="table-container" style={{ position: "relative" }}>
        {loading && (
          <div className="spinner-container">
            <Loader />
          </div>
        )}
        <Table columns={columns} className="user-table" id="userTable">
          {data.map((row, index) => (
            <tr key={row.login}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{row.login}</td>
              <td>{row.fullname}</td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default User;
