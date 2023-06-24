import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPatchPlusFill } from "react-icons/bs";

import styles from "../page.module.css";
import Layout from "../components/Layout";
import ShowToDos from "../components/ShowToDos";
import ModalAddTask from "../components/ModalAddTask";
import ShowToDoFiniShed from "@/components/ShowToDoFiniShed";
import { useStore } from "@/store/StoreProvider";

export default function Home() {
  const { isLoading, user } = useUser();
  const { tasksFinished } = useStore();
  // const router = useRouter();
  const [showAddTask, setShowAddTask] = useState(false);

  const openModalAddTask = () => {
    !showAddTask ? setShowAddTask(true) : setShowAddTask(false);
  };

  useEffect(() => {}, [tasksFinished]);
  console.log(tasksFinished);

  return (
    <Layout>
      {isLoading ? (
        <main className={styles.main}>
          <p>Cargando...</p>
        </main>
      ) : !user ? (
        <main className={styles.main}>
          <h2>Necesitas iniciar sesión para continuar en el sitio</h2>
          <Link href="/api/auth/login">
            <span>Login</span>
          </Link>
        </main>
      ) : (
        <main className={styles.main}>
          <ShowToDos />
          <button onClick={openModalAddTask} className={styles.btnAddtask}>
            <BsFillPatchPlusFill />
          </button>
          {showAddTask && <ModalAddTask setHideOrShow={openModalAddTask} />}
          {tasksFinished.length > 0 && <ShowToDoFiniShed />}
        </main>
      )}
    </Layout>
  );
}
