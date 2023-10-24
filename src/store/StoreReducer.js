const initialState = {
  tasksArray: [],
  tasksFinished: [],
  permissionChangePassword: false,
};

const types = {
  ADD_TASK: "ADD_TASK",
  ADD_LIST_TASK: "ADD_LIST_TASK",
  FINISHED_TASK: "FINISHED_TASK",
  DELETE_TASK: "DELETE_TASK",
  SET_PERMISSION_CHANGE_PASSWORD: "SET_PERMISSION_CHANGE_PASSWORD",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      const propsCheckResult =
        action.payload.hasOwnProperty("name") && action.payload["name"] !== "";
      if (!propsCheckResult) return state;
      return {
        ...state,
        tasksArray: [...state.tasksArray, action.payload],
      };

    case types.ADD_LIST_TASK:
      return {
        ...state,
        tasksArray: action.payload,
      };

    case types.FINISHED_TASK:
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.id !== action.payload.id
        ),
        tasksFinished: [...state.tasksFinished, action.payload],
      };

    case types.DELETE_TASK:
      return {
        ...state,
        tasksArray: state.tasksArray.filter(
          (task) => task.id !== action.payload.id
        ),
      };

    case types.SET_PERMISSION_CHANGE_PASSWORD: {
      return {
        ...state,
        permissionChangePassword: action.payload,
      };
    }

    default:
      state;
  }
};

export default reducer;
export { initialState, types };
