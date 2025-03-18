export const SET_PAGE = "SET_PAGE";
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";
export const SET_LOGIN_PAGE = "SET_LOGIN_PAGE";
export const SET_PONSERIAL_PAGE = "SET_PONSERIAL_PAGE";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setActivePage = (action) => ({
  type: SET_ACTIVE_PAGE,
  payload: action,
});

export const setLoginPage = (action) => ({
  type: SET_LOGIN_PAGE,
  payload: action,
});

export const setPonSerialPage = (action) => ({
  type: SET_PONSERIAL_PAGE,
  payload: action,
});

export const setStartDate = (action) => ({
  type: SET_START_DATE,
  payload: action,
});

export const setEndDate = (action) => ({
  type: SET_END_DATE,
  payload: action,
});