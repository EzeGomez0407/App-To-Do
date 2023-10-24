import { StoreContext, useDispatch } from "./StoreProvider";
import { types } from "./StoreReducer";
import React, { useContext } from "react";

const addTaskAction = (task) => {
  const [state, dispatch] = useContext(StoreContext);
  const props = ["name", "description"];

  const propsCheckResult = props.every(
    (prop) => task.hasOwnProperty(prop) && task[prop] !== ""
  );

  if (!propsCheckResult) return propsCheckResult;
  dispatch({ type: types.ADD_TASK, payload: task });
};

export { addTaskAction };
