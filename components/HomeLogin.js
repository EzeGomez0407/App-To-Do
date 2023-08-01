import React, { useState, useEffect } from "react";
import { useStore } from "@/store/StoreProvider";
import { BsFillPatchPlusFill } from "react-icons/bs";

import ShowToDos from "../components/ShowToDos";
import ModalAddTask from "../components/ModalAddTask";
import ShowToDoFiniShed from "@/components/ShowToDoFiniShed";
import styles from "./styles/HomeLogin.module.css";

export default function HomeLogin() {
  const { tasksFinished } = useStore();
  const [showAddTask, setShowAddTask] = useState(false);

  const openModalAddTask = () => {
    !showAddTask ? setShowAddTask(true) : setShowAddTask(false);
  };

  useEffect(() => {}, [tasksFinished]);
  return (
    <main className={styles.main}>
      <ShowToDos />
      <button onClick={openModalAddTask} className={styles.btnAddtask}>
        <BsFillPatchPlusFill />
      </button>
      {showAddTask && <ModalAddTask setHideOrShow={openModalAddTask} />}
      {tasksFinished[0] && <ShowToDoFiniShed />}
    </main>
  );
}
