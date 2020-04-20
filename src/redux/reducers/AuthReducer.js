const initialState = {
  user: undefined,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      console.log("set_userdata_reducer");
      return { user: action.payload };
    case "DELETE_USER_DATA":
      console.log("delete_userdate_reducer");
      return { initialState };
    default:
      return state;
  }
};

export default AuthReducer;
