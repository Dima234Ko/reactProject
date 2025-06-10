import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openTask, closeTask } from './functions/work';
import {
  setBulleanTask,
  setActivePage,
} from './store/actions/pageLogTaskActions';
import { setCancelTokenSetTask } from './store/actions/progressActions';
import { setCancelTokenGetTask } from './store/actions/progressActions';
import { setPage } from './store/actions/taskActions';
import Authorization from './pages/Authorization';
import Header from './components/Header';
import Status from './pages/user/Status';
import Pppoe from './pages/user/PPPOE';
import Static from './pages/user/Static';
import Wifi from './pages/user/Wifi';
import Settings from './pages/user/Settings';
import Region from './pages/user/Region';
import User from './pages/admin/Accounts';
import Report from './pages/admin/Report';
import Disabling from './pages/user/Disabling';
import Work from './pages/user/Work';
import Malfunction from './pages/user/Malfunction';
import UserInfo from './pages/user/UserInfo';
import Replcement from './pages/user/Replacement';
import ChangePassword from './pages/user/СhangePassword';
import CamNtu from './pages/user/CamNtu';
import ActionDisplay from './components/ActionDisplay';
import ThemeToggle from './components/ThemeToggle';
import TaskButton from './components/Button/TaskButton';
import ExpressButton from './components/Button/ExpressButton';
import ShareButton from './components/Button/ShareButton';
import FormInfo from './components/Form/Form';
import FavIcon from './components/Icon';

function App() {
  return (
    <Router>
      <FavIcon />
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(location.search);
  const { pathname } = location;

  // Параметры из URL
  const hasSerial = params.has('serial');
  const hasRegion = params.has('region');
  const hasWork = params.has('work');
  const hasLogin = params.has('login');
  const hasIp = params.has('ip');
  const isWorkParam = params.get('work');

  // Состояние UI
  const showBackButton = pathname !== '/';
  const showBurgerMenu = pathname !== '/';

  // Redux state
  const serialFromRedux = useSelector((state) => state.serial.serial);
  const regionFromRedux = useSelector((state) => state.region.region);
  const loginFromRedux = useSelector((state) => state.login.login);
  const workFromRedux = useSelector((state) => state.work.work);
  const taskFromRedux = useSelector((state) => state.task);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const prevPathnameRef = useRef(null);

  // Получение userRoot из localStorage
  const getUserRoot = () => {
    const authResult = localStorage.getItem('authResult');
    if (!authResult) return '0';
  
    try {
      const parsed = JSON.parse(authResult);
      if (Date.now() > parsed.expiresAt) {
        localStorage.removeItem('authResult');
        return '0';
      }
      return parsed.value;
    } catch {
      localStorage.removeItem('authResult'); 
      return '0';
    }
  };
  
  const userRoot = getUserRoot();

  // Функция редиректа
  const getRedirectPath = (pathname) => {
    const needWork = ['/status', '/wifi', '/pppoe', '/malfunction', '/info'];
    const needRegion = [...needWork, '/work'];
    const needSerial = ['/pppoe', '/wifi', '/info'];
    const rootOnly = ['/user', '/report'];

    if (!hasWork && needWork.includes(pathname)) return '/work';
    if (!hasRegion && needRegion.includes(pathname)) return '/region';
    if (!hasSerial && needSerial.includes(pathname)) return '/status';
    if (!hasLogin && pathname === '/info') return '/pppoe';
    if (rootOnly.includes(pathname) && userRoot !== '1') return '/region';
    if (pathname !== '/' && !['1', '2', '3'].includes(userRoot)) return '/';

    return null;
  };

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      dispatch(setCancelTokenSetTask(true));
      dispatch(setCancelTokenGetTask(false));
    }
    prevPathnameRef.current = pathname;
  }, [pathname, dispatch]);

  useEffect(() => {
    if (pathname !== '/report') {
      dispatch(setBulleanTask(true));
      dispatch(setActivePage(1));
    }
  }, [pathname, dispatch]);

  // Установка названия страницы через setPage
  useEffect(() => {
    if (pathname === '/status') {
      dispatch(setPage('status'));
    } else if (pathname === '/pppoe') {
      dispatch(setPage('pppoe'));
    } else if (pathname === '/wifi') {
      if (!hasIp) {
        dispatch(setPage('wifi'));
      } else dispatch(setPage('wifi2'));
    } else if (pathname === '/info') {
      dispatch(setPage('info'));
    } else if (pathname === '/static') {
      dispatch(setPage('static'));
    } else if (pathname === '/camntu') {
      dispatch(setPage('camntu'));
    } else dispatch(setPage(null));
  }, [pathname, dispatch]);

  // Функция получения пунктов меню
  const getMenuItems = () => {
    const isRoot = userRoot === '1';
    const isSettingsOrRegion =
      pathname === '/settings' || pathname === '/region';
    const isNotRootPage = pathname !== '/';

    return [
      {
        id: 'workPage',
        name: 'Главная',
        to: '/work',
        show:
          !isSettingsOrRegion ||
          (isSettingsOrRegion && isRoot) ||
          pathname !== '/work',
      },
      {
        id: 'statusPage',
        name: 'Статус',
        to: `/status?region=${regionFromRedux}&work=${workFromRedux}`,
        show:
          isWorkParam &&
          pathname !== '/status' &&
          !['/work', '/malfunction', '/disable'].includes(pathname),
      },
      //Замена NTU временно отключена
      // {
      //   id: 'replcementPage',
      //   name: 'Замена NTU',
      //   to: `/replcement?region=${regionFromRedux || ''}&work=${workFromRedux || ''}`,
      //   show:
      //     isWorkParam &&
      //     isWorkParam !== 'newConnection' &&
      //     pathname !== '/replcement' &&
      //     !['/work', '/malfunction', '/disable'].includes(pathname),
      // },
      {
        id: 'pppoePage',
        name: 'PPPoE',
        to: `/pppoe?region=${regionFromRedux || ''}&work=${workFromRedux || ''}&serial=${serialFromRedux || ''}`,
        show: isNotRootPage && hasSerial && isWorkParam !== 'newConnection',
      },
      {
        id: 'wifiPage',
        name: 'WiFi',
        to: `/wifi?region=${regionFromRedux || ''}&work=${workFromRedux || ''}&serial=${serialFromRedux || ''}${loginFromRedux ? `&login=${loginFromRedux}` : ''}`,
        show: isNotRootPage && hasSerial && isWorkParam !== 'newConnection',
      },
      {
        id: 'userPage',
        name: 'Пользователи',
        to: '/user',
        show: isRoot,
      },
      {
        id: 'reportPage',
        name: 'Отчет',
        to: '/report',
        show: isRoot,
      },
      {
        id: 'settingsPage',
        name: 'Настройки',
        to: '/settings',
        show:
          !isSettingsOrRegion || (isNotRootPage && (!hasSerial || isWorkParam)),
      },
      {
        id: 'homePage',
        name: 'Выход',
        to: '/',
        show: true,
      },
    ].filter((item) => item.show);
  };

  const redirectPath = getRedirectPath(pathname);
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  const menuItems = getMenuItems();

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <>
      <Header
        menuItems={menuItems}
        showBackButton={showBackButton}
        showBurgerMenu={showBurgerMenu}
      />
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
          <Route path="/pppoe" element={<Pppoe />} />
          <Route path="/static" element={<Static />} />
          <Route path="/camntu" element={<CamNtu />} />
          <Route path="/wifi" element={<Wifi />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/region" element={<Region />} />
          <Route path="/user" element={<User />} />
          <Route path="/report" element={<Report />} />
          <Route path="/disable" element={<Disabling />} />
          <Route path="/work" element={<Work />} />
          <Route path="/malfunction" element={<Malfunction />} />
          <Route path="/replcement" element={<Replcement />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/info" element={<UserInfo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {isFormOpen && (
        <FormInfo
          isFormOpen={isFormOpen}
          closeForm={closeForm}
          formData={
            <>
              <h2>Подтвердите</h2>
              <pre>Выберите действие</pre>
              <div className="input-container">
                <ExpressButton
                  onClick={() => {
                    if (pathname === '/work') {
                      openTask(
                        navigate,
                        taskFromRedux,
                        serialFromRedux,
                        loginFromRedux,
                        closeForm
                      );
                    } else {
                      closeForm();
                    }
                  }}
                  text="Продолжить"
                  closeButton={false}
                />

                <ExpressButton
                  onClick={() =>
                    closeTask({
                      navigate,
                      regionFromRedux,
                      dispatch,
                      closeForm,
                    })
                  }
                  text="Завершить"
                  closeButton={true}
                />
                <br></br>
              </div>
            </>
          }
        />
      )}
      {pathname === '/work' && taskFromRedux.transition && (
        <TaskButton onClick={openForm} text="Активная задача" />
      )}
      {(pathname === '/status' ||
        pathname === '/pppoe' ||
        pathname === '/wifi' ||
        pathname === '/malfunction' ||
        pathname === '/replcement' ||
        pathname === '/camntu' ||
        pathname === '/static') &&
        isWorkParam !== 'newConnection' && (
          <TaskButton onClick={openForm} text="Завершить задачу" />
        )}
      <div className="toolbar">
        {isWorkParam === 'newConnection' && <ActionDisplay />}
        {pathname !== '/' && <ShareButton />}
        <ThemeToggle />
      </div>
    </>
  );
}

export default App;
