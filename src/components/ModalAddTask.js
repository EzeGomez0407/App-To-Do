import React, { useEffect, useState } from "react";
import style from "./styles/ModalAddTask.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "../store/StoreProvider";
import { types } from "../store/StoreReducer";
import { v4 as uuidv4 } from "uuid";

export default function ModalAddTask({ setHideOrShow }) {
  const dispatch = useDispatch();
  const [activateTime, setActivateTime] = useState(true);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    timeLimit: { hoursLimit: 0, minutesLimit: 0, seconds: 0 },
    id: uuidv4(),
  });

  const handlerOnClickActivateTime = (e) => {
    e.preventDefault();
    !activateTime ? setActivateTime(true) : setActivateTime(false);
  };

  const handlerOnClickAddTask = (e) => {
    e.preventDefault();

    const pErrorEmptyName = document.getElementById("p-error-empty-name");
    if (newTask.name.trimStart() === "") {
      pErrorEmptyName.style.visibility = "visible";
      return;
    }

    const task = {
      name: newTask.name,
      description: newTask.description,
      timeLimit:
        activateTime &&
        newTask.timeLimit.hoursLimit < 1 &&
        newTask.timeLimit.minutesLimit < 1
          ? null
          : {
              hoursLimit:
                newTask.timeLimit.hoursLimit > 0
                  ? newTask.timeLimit.hoursLimit
                  : 0,
              minutesLimit:
                newTask.timeLimit.minutesLimit > 0
                  ? newTask.timeLimit.minutesLimit
                  : 0,
              seconds:
                newTask.timeLimit.seconds > 0 ? newTask.timeLimit.seconds : 0,
            },
      id: newTask.id,
    };
    if (task.timeLimit?.hoursLimit < 1 && task.timeLimit?.minutesLimit < 1) {
      task.timeLimit = null;
    }
    dispatch({ type: types.ADD_TASK, payload: task });
    setHideOrShow();
  };

  const handlerChangeAddTask = (e) => {
    const { name, value, id } = e.target;
    if (name === "timeLimit") {
      setNewTask(() => ({
        ...newTask,
        [name]: {
          ...newTask.timeLimit,
          [id]: parseInt(value),
        },
      }));

      return;
    }
    setNewTask(() => ({
      ...newTask,
      [name]: value,
    }));

    return;
  };

  useEffect(() => {
    const circleSlideElement = document.getElementById("circle-slide");
    const buttonActiveTime = document.getElementById("buttonActiveTime");
    if (!activateTime) {
      circleSlideElement.style.backgroundColor = "#3f51b5";
      circleSlideElement.style.transform = "translate(100%, -50%)";
      buttonActiveTime.style.borderColor = "#5f81a5";
    } else {
      circleSlideElement.style.backgroundColor = "#74778a";
      circleSlideElement.style.transform = "translate(-1px, -50%)";
      buttonActiveTime.style.borderColor = "#7a7a7a";
    }
  }, [activateTime, newTask]);

  return (
    <div className={style.containModal}>
      <div className={style.modal}>
        <button onClick={setHideOrShow} className={style.buttonCloseModal}>
          <AiOutlineCloseCircle />
        </button>
        <form className={style.formAddTask} onChange={handlerChangeAddTask}>
          <label className={style.labelNameTask}>
            <p>Nombre de la tarea</p>
            <input
              type="text"
              className={style.inputNameTask}
              name="name"
              placeholder="Obligatorio"
              autoComplete="off"
            />
          </label>
          <label className={style.labelDescriptionTask}>
            <p>Descricion</p>
            <textarea
              className={style.inputDescriptionTask}
              name="description"
            />
          </label>
          <div className={style.divContainLimitTaskField}>
            <div className={style.divTitleAndClickTimeLimit}>
              <p>Limitar Tiempo</p>
              <button
                className={style.buttonTaskTimeLimit}
                onClick={handlerOnClickActivateTime}
                id="buttonActiveTime"
              >
                <span
                  className={style.circleSlideTaskTimeLimit}
                  id="circle-slide"
                ></span>
              </button>
            </div>
            <div className={style.divInputsToTimeLimit}>
              <label>
                Horas
                <input
                  type="number"
                  min={1}
                  disabled={activateTime}
                  className={style.timeLimitOfTask}
                  name="timeLimit"
                  id="hoursLimit"
                />
              </label>
              <label>
                Minutos
                <input
                  type="number"
                  min={0}
                  max={59}
                  disabled={activateTime}
                  className={style.timeLimitOfTask}
                  name="timeLimit"
                  id="minutesLimit"
                />
              </label>
              <span className={style.infoTimeLimit}>
                Ajusta cuántas horas o minutos le dedicaras a tu tarea.
              </span>
            </div>
          </div>

          <p className={style.pError} id="p-error-empty-name">
            El campo nombre es obligatorio
          </p>
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
