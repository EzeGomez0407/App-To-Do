import React, { useEffect } from "react";
import ToDo from "./ToDo";
import { useStore } from "@/store/StoreProvider";
import style from "./styles/ShowToDos.module.css";

export default function ShowToDos() {
  const state = useStore();
  const { tasksArray } = state;

  useEffect(() => {}, [tasksArray]);

  return (
    <section className={style.sectionShowToDos}>
      {!tasksArray[0] ? (
        <span className={style.emptyTaskArray}>No hay tareas pendientes</span>
      ) : (
        tasksArray.map((task, index) => (
          <ToDo
            key={index}
            id={index}
            name={task.name}
            description={task.description}
            timeLimit={task?.timeLimit}
          />
        ))
      )}
    </section>
  );
}
