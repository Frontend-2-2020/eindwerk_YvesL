const initialState = {
  posts: [],
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_POSTS":
      return {
        ...state,
        posts: action.payload.data,
      };

    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload.last_page,
      };
    default:
      return state;
  }
};

export default PostsReducer;
