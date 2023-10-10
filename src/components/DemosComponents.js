import React from "react";
import Image from "next/image";
import style from "./styles/DemosComponents.module.css";

import taskNoLimit from "../../public/taskNoLimit.gif";
import limitTask from "../../public/limitTask.gif";

function DemoAddToDo() {
  return (
    <div className={style.contentAddToDo}>
      <h2 className={style.titleDemo}>No olvides realizar tus tareas</h2>
      <p className={style.descriptionDemo}>
        Puedes agregar una tarea a tu lista siguiendo unos simples pasos, así
        tendrás un día más organizado y no olvidarás tus quehaceres
      </p>
      <Image
        src={limitTask}
        priority
        className={style.imgAddToDo}
        alt="Demo de tarea sin limite de tiempo"
      />
    </div>
  );
}

function DemoAddToDoLimit() {
  return (
    <div className={style.contentAddToDoLimit}>
      <h2 className={style.titleDemo}>
        No pases haciendo todo el día lo mismo
      </h2>
      <p className={style.descriptionDemo}>
        Añade tareas a tu lista con límites de tiempo precisos. Recibirás una
        notificación cuando el tiempo esté llegando a su fin.
      </p>
      <Image
        src={taskNoLimit}
        priority
        className={style.imgAddToDo}
        alt="Demo de tarea con limite de tiempo"
      />
    </div>
  );
}

export { DemoAddToDo, DemoAddToDoLimit };
