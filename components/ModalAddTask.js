import React, { useEffect, useState } from "react";
import style from "./styles/ModalAddTask.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "@/store/StoreProvider";
import { types } from "@/store/StoreReducer";

export default function ModalAddTask({ setHideOrShow }) {
  const dispatch = useDispatch();
  const [activateTime, setActivateTime] = useState(true);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    timeLimit: "",
  });

  const circleSlideElement = document.getElementById("circle-slide");

  const handlerOnClickActivateTime = (e) => {
    e.preventDefault();
    !activateTime ? setActivateTime(true) : setActivateTime(false);
  };

  const handlerOnClickAddTask = (e) => {
    e.preventDefault();
    dispatch({ type: types.ADD_TASK, payload: newTask });
    setHideOrShow();
  };

  const handlerChangeAddTask = (e) => {
    const { name, value } = e.target;
    setNewTask(() => ({
      ...newTask,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (circleSlideElement) {
      if (!activateTime) {
        circleSlideElement.style.backgroundColor = "#a6e6a6";
        circleSlideElement.style.transform = "translate(100%, -50%)";
      } else {
        circleSlideElement.style.backgroundColor = "#c6a6a6";
        circleSlideElement.style.transform = "translate(-1px, -50%)";
      }
    }
  }, [activateTime, newTask]);

  return (
    <div className={style.containModal}>
      <div className={style.modal}>
        <button onClick={setHideOrShow} className={style.buttonCloseModal}>
          <AiOutlineCloseCircle />
        </button>
        <form className={style.formAddTask} onChange={handlerChangeAddTask}>
          <label className={style.labelFormAddTask}>
            <p>Nombre de la tarea</p>
            <input type="text" className={style.inputNameTask} name="name" />
          </label>
          <label className={style.labelFormAddTask}>
            <p>Descricion</p>
            <textarea
              className={style.inputDescriptionTask}
              name="description"
            />
          </label>
          <label className={style.labelFormAddTask}>
            <div className={style.divButtonTaskLimit}>
              <input
                type="time"
                disabled={activateTime}
                className={style.timeLimitOfTask}
                name="timeLimit"
              />
              <button
                className={style.buttonTaskTimeLimit}
                onClick={handlerOnClickActivateTime}
              >
                <span
                  className={style.circleSlideTaskTimeLimit}
                  id="circle-slide"
                ></span>
              </button>
            </div>
          </label>
          <button
            className={style.buttonAddedTask}
            onClick={handlerOnClickAddTask}
          >
            Agregar Tarea
          </button>
        </form>
      </div>
    </div>
  );
}
