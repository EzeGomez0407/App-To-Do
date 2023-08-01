import React, { useEffect } from "react";
import style from "./styles/TimeNotice.module.css";
import { useDispatch } from "@/store/StoreProvider";
import { types } from "@/store/StoreReducer";

export default function TimeNotified({ task, handlerShow }) {
  const dispatch = useDispatch();

  const handlerFinshiedTask = () => {
    dispatch({ type: types.FINISHED_TASK, payload: task });
  };

  useEffect(() => {
    const soundAlert = new Audio("/alert-notified.mp3");
    soundAlert.play();

    return () => {
      soundAlert.pause();
      soundAlert.currentTime = 0;
    };
  }, []);
  return (
    <div className={style.containNotifiedTime}>
      <p className={style.textNotfied}>
        Te quedan 30 segundos para finalizar "{task.name}"
      </p>{" "}
      <button
        className={style.buttonFinishedTask}
        onClick={handlerFinshiedTask}
      >
        Finalizar Tarea
      </button>
      <button className={style.buttonCloseNotified} onClick={handlerShow}>
        Cerrar
      </button>
    </div>
  );
}
