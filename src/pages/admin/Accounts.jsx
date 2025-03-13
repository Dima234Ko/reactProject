import React, { useState, useEffect } from "react";
import { Table } from "../../components/Table";
import {
  AddUserButton,
  ChangePassButton,
  DeleteUserButton,
} from "../../components/Button";
import { Loader } from "../../components/Loader";
import { getAllUsers } from "../../functions/account";
import { FormAddUser } from "../../components/Form/FormAddUser";
import { FormInfo } from "../../components/Form/Form";

function User() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [formContent, setFormContent] = useState(null); // Состояние для контента формы

  const getUserData = async () => {
    let userData = await getAllUsers();
    return userData;
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

  // Обновление списка пользователей после успешного создания
  useEffect(() => {
    if (createSuccess) {
      const fetchData = async () => {
        try {
          const result = await getUserData();
          setData(result);
          setCreateSuccess(false);
        } catch (error) {
          console.error("Error refreshing data:", error);
        }
      };
      fetchData();
    }
  }, [createSuccess]);

  const columns = ["Логин", "Фамилия Имя Отчество"];

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setFormContent(null); // Очищаем контент при закрытии
  };

  const handleAddUser = () => {
    // Устанавливаем контент формы непосредственно в этой функции
    setFormContent(
      <FormAddUser
        isCreating={loading}
        setIsCreating={setLoading}
        setCreateSuccess={setCreateSuccess}
      />
    );
    openForm(); // Открываем форму
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

      {/* Форма создания пользователя */}
      {isFormOpen && (
        <div className="form-overlay">
          <FormInfo
            isFormOpen={isFormOpen}
            closeForm={closeForm}
            formData={formContent}
          />
          <button onClick={closeForm} className="close-form-button">
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}

export default User;