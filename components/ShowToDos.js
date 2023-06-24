import React, { useEffect } from "react";
import ToDo from "./ToDo";
import { useStore } from "@/store/StoreProvider";

export default function ShowToDos() {
  const state = useStore();
  const { tasksArray } = state;

  useEffect(() => {}, [tasksArray]);

  return (
    <section>
      {tasksArray?.map((task, index) => (
        <ToDo
          key={index}
          id={index}
          name={task.name}
          description={task.description}
          timeLimit={task?.timeLimit}
        />
      ))}
    </section>
  );
}
