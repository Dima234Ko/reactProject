export const SET_PAGE = "SET_PAGE";
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";
export const SET_USER_PAGE = "SET_USER_PAGE";
export const SET_PONSERIAL_PAGE = "SET_PONSERIAL_PAGE";
export const SET_START_DATE = "SET_START_DATE";
export const SET_END_DATE = "SET_END_DATE";
export const SET_BULLEAN_TASK = "SET_BULLEAN_TASK";
export const SET_CANNAL = "SET_CANNAL";
export const SET_REGION_TASK = "SET_REGION_TASK";

export const setRegionTask = (region) => ({
  type: SET_REGION_TASK,
  payload: region,
});

export const setBulleanTask = (task) => ({
  type: SET_BULLEAN_TASK,
  payload: task,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setActivePage = (action) => ({
  type: SET_ACTIVE_PAGE,
  payload: action,
});

export const setUserPage = (action) => ({
  type: SET_USER_PAGE,
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

export const setCannal = (page) => ({
  type: SET_CANNAL,
  payload: page,
});