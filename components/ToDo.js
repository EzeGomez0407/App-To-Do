import React from "react";
import style from "./styles/ToDo.module.css";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { useDispatch } from "@/store/StoreProvider";
import { types } from "@/store/StoreReducer";

export default function ToDo({ timeLimit, name, description, id }) {
  const dispatch = useDispatch();

  const handlerDeleteTask = () => {
    dispatch({ type: types.DELETE_TASK, payload: name });
  };

  const handlerFinshiedTask = () => {
    dispatch({
      type: types.FINISHED_TASK,
      payload: { name, description, id },
    });
  };

  return timeLimit ? (
    <article className={style.articleTask}>
      <div className={style.divContainName}>
        <span className={style.spanName}>{name}</span>
        <span className={style.spanTime}>{timeLimit}</span>
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
  ) : (
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
