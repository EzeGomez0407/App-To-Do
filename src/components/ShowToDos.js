import React, { useEffect } from "react";
import ToDo from "./ToDo";
import { useDispatch, useStore } from "../store/StoreProvider";
import style from "./styles/ShowToDos.module.css";
import ToDoLimit from "./ToDoLimit";
import { useLocalStorage } from "../custom_hooks/useLocalStorage";
import { types } from "../store/StoreReducer";
import { useSession } from "next-auth/react";

export default function ShowToDos() {
  const state = useStore();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const { tasksArray } = state;
  const [taskLocalStorage, setTaskLocalStorage] = useLocalStorage(
    session?.user.email,
    tasksArray
  );

  useEffect(() => {
    dispatch({ type: types.ADD_LIST_TASK, payload: taskLocalStorage });
  }, []);

  useEffect(() => {
    setTaskLocalStorage(tasksArray);
  }, [tasksArray]);

  return (
    <section className={style.sectionShowToDos}>
      {!taskLocalStorage[0] ? (
        <span className={style.emptyTaskArray}>No hay tareas pendientes</span>
      ) : (
        taskLocalStorage.map((task) =>
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
