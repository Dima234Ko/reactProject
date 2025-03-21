import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../../components/Table";
import { FiltrButton } from "../../components/Button";
import { FormInfo } from "../../components/Form/Form";
import { FormFilterReport } from "../../components/Form/FormFilterReport";
import { FormReportTask } from "../../components/Form/FormReportTask";
import { Loader } from "../../components/Loader";
import { getReport } from "../../functions/report";
import { setReportTask } from "../../store/actions/taskReportActions";
import { setActivePage } from "../../store/actions/pageLogTaskActions";
import { Pagination } from "../../components/Pagination";
import { FilterDisplay } from "../../components/FilterDisplay";
import { SwitchComponent } from "../../components/Swich";

function Report() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formContent, setFormContent] = useState(null);
  const dispatch = useDispatch();
  const taskReport = useSelector((state) => state.taskReport.task);
  const activePage = useSelector((state) => state.page.activePage);
  const page = useSelector((state) => state.page.page);
  const startDate = useSelector((state) => state.page.startDate);
  const endDate = useSelector((state) => state.page.endDate);
  const selectedUser = useSelector((state) => state.page.userPage);
  const ponSerial = useSelector((state) => state.page.ponSerialPage);
  const task = useSelector((state) => state.page.task);
  const cannal = useSelector((state) => state.page.cannal);
  const regionTask = useSelector((state) => state.page.regionTask);
  const workTask = useSelector((state) => state.page.workTask);
  const loginTask = useSelector((state) => state.page.loginTask);

  const getLogData = async () => {
    let reportData = await getReport(
      dispatch,
      task,
      activePage,
      startDate,
      endDate,
      selectedUser,
      ponSerial,
      cannal,
      regionTask,
      workTask,
      loginTask
    );
    return reportData;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getLogData();
        setData(result);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    activePage,
    startDate,
    endDate,
    selectedUser,
    ponSerial,
    task,
    cannal,
    regionTask,
    workTask,
    loginTask
  ]);

  let columns;
  if (task) {
    columns = ["Дата", "Логин", "ID устройства", "Вид работ", "US"];
  } else {
    columns = ["Дата", "Логин", "ID устройства", "Канал", "US"];
  }

  const handleHeaderWorkNameClick = async (row) => {
    dispatch(setReportTask(row.idHeader || row.id));
    setFormContent(<FormReportTask onClose={() => setIsFormOpen(false)} />);
    setIsFormOpen(true);
  };

  const openFilterForm = () => {
    setFormContent(
      <FormFilterReport onClose={() => setIsFormOpen(false)} task={task} />,
    );
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setFormContent(null);
  };

  const tableBody = filteredData.map((row) => (
    <tr key={row.id}>
      <td>{row.date}</td>
      <td data-value={row.taskName}>{row.login}</td>
      <td>{row.ponSerial}</td>
      <td>
        <span
          onClick={() => handleHeaderWorkNameClick(row)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {row.headerWorkName || row.channel || "-"}
        </span>
      </td>
      <td>
        <a
          href={`http://172.24.10.30/oper/?core_section=customer&action=show&id=${row.idUserSideCard}`}
          target="_blank"
        >
          {row.userSideLogin}
        </a>
      </td>
    </tr>
  ));

  return (
    <div id="log">
      <h2>Отчет</h2>
      <div className="switch-section">
        <SwitchComponent />
      </div>
      <FormInfo
        isFormOpen={isFormOpen}
        closeForm={closeForm}
        formData={formContent}
      />
      <div id="tableButton">
        <FiltrButton onClick={openFilterForm} />
      </div>
      <FilterDisplay
        startDate={startDate}
        endDate={endDate}
        selectedUser={selectedUser}
        ponSerial={ponSerial}
        regionTask={regionTask}
        loginTask={loginTask}
      />
      {loading ? (
        <div className="spinner-container">
          <Loader />
        </div>
      ) : (
        <>
          <Table columns={columns} className="log-table" id="logTable">
            {tableBody}
          </Table>
          <Pagination
            totalPages={page}
            activePage={activePage}
            onPageChange={(page) => dispatch(setActivePage(page))}
          />
        </>
      )}
    </div>
  );
}

export default Report;
