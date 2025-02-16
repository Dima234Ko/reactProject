import React from "react";
import { Table } from "../../components/Table";
import { Button } from "../../components/Button";

const data = [
  { login: "johndoe", fullname: "John Doe" },
  { login: "janesmith", fullname: "Jane Smith" },
  { login: "carlosg", fullname: "Carlos Garcia" },
];

function User() {
  // Заголовки для столбцов
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
        <Button name="Добавить пользователя" onClick={handleAddUser} />
        <Button name="Изменить пароль" onClick={handleChangePass} />
        <Button name="Удалить пользователя" onClick={handleDeleteUser} />
      </div>
      <Table columns={columns} className="user-table" id="userTable">
        {data.map((row, index) => (
          <tr key={index}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{row.login}</td>
            <td>{row.fullname}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default User;
