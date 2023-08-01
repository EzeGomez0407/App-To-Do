import React, { useState, useEffect } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { useDispatch } from "@/store/StoreProvider";
import { FiDelete } from "react-icons/fi";

import style from "./styles/ToDo.module.css";
import { types } from "@/store/StoreReducer";
import { taskTimeControl } from "../controllers/taskTimeControl";
import TimeNotified from "./ModalTimeNotice";

export default function ToDoLimit({ task }) {
  const dispatch = useDispatch();
  const { timeLimit, name, description, id } = task;
  const [timeShow, setTimeShow] = useState(timeLimit);
  const [timeNotice, setTimeNotice] = useState(false);
  const [tasksFinisheds, setTaskFinished] = useState(false);

  const handlerShowNotified = () => {
    setTimeNotice(false);
  };

  const handlerDeleteTask = () => {
    dispatch({ type: types.DELETE_TASK, payload: task });
  };

  const handlerFinshiedTask = () => {
    dispatch({
      type: types.FINISHED_TASK,
      payload: { name, description, id },
    });
  };

  useEffect(() => {
    const idInterval = taskTimeControl(
      timeShow,
      setTimeShow,
      setTaskFinished,
      setTimeNotice
    );
    if (tasksFinisheds) {
      dispatch({ type: types.FINISHED_TASK, payload: task });
      clearInterval(idInterval);
    }
    return () => {
      clearInterval(idInterval);
      setTimeNotice(false);
    };
  }, [tasksFinisheds]);

  return (
    <article className={style.articleTask}>
      {timeNotice && (
        <TimeNotified
          task={{ name, description, id }}
          handlerShow={handlerShowNotified}
        />
      )}
      <div className={style.divContainName}>
        <span className={style.spanName}>{name}</span>
        <div>
          <span
            className={style.spanTime}
          >{`${timeShow.hoursLimit}:${timeShow.minutesLimit}:${timeShow.seconds}`}</span>
        </div>
        <div className={style.divContainButtons}>
          <button
            className={style.btntaskFinished}
            onClick={handlerFinshiedTask}
          >
            <BsPatchCheckFill />
          </button>
          <button className={style.btnDeleteTask} onClick={handlerDeleteTask}>
            <FiDelete />
          </button>
        </div>
      </div>
      {description && (
        <div className={style.divContainDescription}>
          <p className={style.description}>{description}</p>
        </div>
      )}
    </article>
  );
}
