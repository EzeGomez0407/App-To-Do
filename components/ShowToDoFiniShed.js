import { useStore } from "@/store/StoreProvider";
import React from "react";

import style from "./styles/ToDoFinished.module.css";
import TaskFinished from "./TaskFinished";

export default function ToDoFiniShed() {
  const { tasksFinished } = useStore();
  return (
    <section className={style.sectionTask}>
      {tasksFinished.reverse().map((task, index) => (
        <TaskFinished
          key={index}
          name={task.name}
          description={task.description}
        />
      ))}
    </section>
  );
}
