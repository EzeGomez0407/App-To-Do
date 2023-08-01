import React, { useEffect } from "react";
import ToDo from "./ToDo";
import { useStore } from "@/store/StoreProvider";
import style from "./styles/ShowToDos.module.css";
import ToDoLimit from "./ToDoLimit";

export default function ShowToDos() {
  const state = useStore();
  const { tasksArray } = state;

  useEffect(() => {}, [tasksArray]);

  return (
    <section className={style.sectionShowToDos}>
      {!tasksArray[0] ? (
        <span className={style.emptyTaskArray}>No hay tareas pendientes</span>
      ) : (
        tasksArray.map((task) =>
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
