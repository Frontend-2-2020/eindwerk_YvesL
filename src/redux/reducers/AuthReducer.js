const initialState = {
  user: undefined,
  led: undefined,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log("reducer_gettoken");
      return { user: action.payload, led: "green" };
    case "LOGOUT":
      console.log("reducer_removetoken");
      return initialState;
    default:
      return state;
  }
};

export default AuthReducer;
