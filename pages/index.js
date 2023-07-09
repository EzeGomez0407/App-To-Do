import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";

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

  return (
    <Layout>
      {isLoading ? (
        <main className={styles.main}>
          <p>Cargando...</p>
        </main>
      ) : user ? (
        <main className={styles.mainWithoutLogin}>
          <h2 className={styles.needLoginText}>
            Necesitas iniciar sesión para continuar en el sitio
          </h2>
          <Link href="/api/auth/login" className={styles.linkLogin}>
            <span className={styles.spanBtnLogin}>Iniciar Sesión</span>
            <FiLogIn />
          </Link>
        </main>
      ) : (
        <main className={styles.main}>
          <ShowToDos />
          <button onClick={openModalAddTask} className={styles.btnAddtask}>
            <BsFillPatchPlusFill />
          </button>
          {showAddTask && <ModalAddTask setHideOrShow={openModalAddTask} />}
          {tasksFinished[0] && <ShowToDoFiniShed />}
        </main>
      )}
    </Layout>
  );
}
