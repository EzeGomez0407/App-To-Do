import { useStore } from "@/store/StoreProvider";
import React from "react";

import style from "./styles/ToDoFinished.module.css";
import TaskFinished from "./TaskFinished";

export default function ToDoFiniShed() {
  const { tasksFinished } = useStore();
  return (
    <section className={style.sectionTask}>
      {tasksFinished.map((task) => (
        <TaskFinished
          key={task.id}
          name={task.name}
          description={task.description}
        />
      ))}
    </section>
  );
}
