export const SET_PAGE = "SET_PAGE";
export const SET_ACTIVE_PAGE = "SET_ACTIVE_PAGE";

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setActivePage = (action) => ({
  type: SET_ACTIVE_PAGE,
  payload: action,
});