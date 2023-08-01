import React from "react";
import Image from "next/image";
import style from "./styles/DemosComponents.module.css";

import taskNoLimit from "../public/taskNoLimit.gif";
import limitTask from "../public/limitTask.gif";

function DemoAddToDo() {
  return (
    <div className={style.contentAddToDo}>
      <h2 className={style.titleDemo}>No olvides realizar tus tareas</h2>
      <p className={style.descriptionDemo}>
        Puedes agregar una tarea a tu lista siguiendo unos simples pasos, así
        tendrás un día más organizado y no olvidarás tus quehaceres
      </p>
      <Image src={limitTask} className={style.imgAddToDo} />
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
      <Image src={taskNoLimit} className={style.imgAddToDo} />
    </div>
  );
}

export { DemoAddToDo, DemoAddToDoLimit };
