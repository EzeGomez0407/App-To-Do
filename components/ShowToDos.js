import React, { useEffect } from "react";
import ToDo from "./ToDo";
import { useDispatch, useStore } from "@/store/StoreProvider";
import style from "./styles/ShowToDos.module.css";
import ToDoLimit from "./ToDoLimit";
import { useLocalStorage } from "@/custom_hooks/useLocalStorage";
import { types } from "@/store/StoreReducer";

export default function ShowToDos() {
  const state = useStore();
  const dispatch = useDispatch();
  const { tasksArray } = state;
  const [taskStorage, setTaskStorage] = useLocalStorage(
    "taskArray",
    tasksArray
  );

  useEffect(() => {
    dispatch({ type: types.ADD_LIST_TASK, payload: taskStorage });
  }, []);

  useEffect(() => {
    setTaskStorage(tasksArray);
  }, [tasksArray]);

  return (
    <section className={style.sectionShowToDos}>
      {!taskStorage[0] ? (
        <span className={style.emptyTaskArray}>No hay tareas pendientes</span>
      ) : (
        taskStorage.map((task) =>
          task.timeLimit !== null ? (
            <ToDoLimit key={task.id} id={task.id} task={task} />
          ) : (
            <ToDo key={task.id} id={task.id} task={task} />
          )
        )
      )}
    </section>
  );
}
