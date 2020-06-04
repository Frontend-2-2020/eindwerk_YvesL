import { API } from "../../config/API";

export const fetchPosts = (activePage) => {
  return function (dispatch) {
    API.get("api/posts?page=" + activePage)
      .then((response) => {
        dispatch({
          type: "LOAD_POSTS",
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const setTotalPages = () => {
  return function (dispatch) {
    API.get("api/posts")
      .then((response) => {
        dispatch({
          type: "SET_TOTAL_PAGES",
          payload: response.data,
        });
        dispatch(fetchPosts(1));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
