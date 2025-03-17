import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/Table";
import {
  AddUserButton,
  ChangeEditUser,
  DeleteUserButton,
} from "../../components/Button";
import { Loader } from "../../components/Loader";
import { getAllUsers } from "../../functions/account";
import { FormEditUser } from "../../components/Form/FormEditUser";
import { FormAddUser } from "../../components/Form/FormAddUser";
import { FormDeleteUser } from "../../components/Form/FormDeleteUser";
import { FormInfo } from "../../components/Form/Form";
import { setCheckedValue } from "../../store/actions/checkboxUserActions";

function User() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [formContent, setFormContent] = useState(null);

  const dispatch = useDispatch();
  const checkedValue = useSelector((state) => state.checkboxUser.checkedValue);

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
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (createSuccess) {
      const fetchData = async () => {
        try {
          const result = await getUserData();
          setData(result);
          setCreateSuccess(false);
        } catch (error) {
          console.error("Ошибка при обновлении данных:", error);
        }
      };
      fetchData();
    }
  }, [createSuccess]);

  const columns = ["", "Логин", "Фамилия Имя Отчество"]; 

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => {
    setIsFormOpen(false);
    setFormContent(null);
  };

  const handleAddUser = () => {
    setFormContent(<FormAddUser setCreateSuccess={setCreateSuccess} />);
    openForm();
  };

  const handleEditUser = () => {
    if (checkedValue !== null) {
      setFormContent(<FormEditUser setCreateSuccess={setCreateSuccess} />);
    } else {
      setFormContent(
        <div className="textForm">
          <h2>Внимание</h2>
          <div>
            <pre>Ошибка: Необходимо выбрать пользователя</pre>
          </div>
        </div>
      );
    }
    openForm();
  };

  const handleDeleteUser = () => {
    if (checkedValue !== null) {
      setFormContent(<FormDeleteUser />);
    } else {
      setFormContent(
        <div className="textForm">
          <h2>Внимание</h2>
          <div>
            <pre>Ошибка: Необходимо выбрать пользователя</pre>
          </div>
        </div>
      );
    }
    openForm();
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    dispatch(setCheckedValue(value));
  };

  const tableBody = data.map((row) => (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          value={row.id}
          onChange={handleCheckboxChange}
          checked={String(checkedValue) === String(row.id)}
        />
      </td>
      <td>{row.login}</td>
      <td>{row.fullName}</td>
    </tr>
  ));

  return (
    <div id="user">
      <h2>Пользователи</h2>
      <div id="tableButton">
        <AddUserButton onClick={handleAddUser} />
        <ChangeEditUser onClick={handleEditUser} />
        <DeleteUserButton onClick={handleDeleteUser} />
      </div>
      <div className="table-container" style={{ position: "relative" }}>
        {loading && (
          <div className="spinner-container">
            <Loader />
          </div>
        )}
        <Table columns={columns} className="user-table" id="userTable">
          {tableBody}
        </Table>
      </div>

      {isFormOpen && (
        <div className="form-overlay">
          <FormInfo
            isFormOpen={isFormOpen}
            closeForm={closeForm}
            formData={formContent}
          />
        </div>
      )}
    </div>
  );
}

export default User;