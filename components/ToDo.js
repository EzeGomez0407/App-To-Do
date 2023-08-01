import React from "react";
import style from "./styles/ToDo.module.css";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { useDispatch, useStore } from "@/store/StoreProvider";
import { types } from "@/store/StoreReducer";

export default function ToDo({ task }) {
  const dispatch = useDispatch();
  const { name, description, id } = task;
  const handlerDeleteTask = () => {
    dispatch({ type: types.DELETE_TASK, payload: task });
  };

  const handlerFinshiedTask = () => {
    dispatch({
      type: types.FINISHED_TASK,
      payload: { name, description, id },
    });
  };

  return (
    <article className={style.articleTask}>
      <div className={style.divContainName}>
        <span className={style.spanName}>{name}</span>
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
