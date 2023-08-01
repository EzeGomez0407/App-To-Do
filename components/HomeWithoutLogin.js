import React from "react";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";

import styles from "./styles/HomeWithoutLogin.module.css";
import { DemoAddToDo, DemoAddToDoLimit } from "@/components/DemosComponents";

export default function HomeWithoutLogin() {
  return (
    <main className={styles.mainWithoutLogin}>
      <section className={styles.sectionDescriptionAppToDO}>
        <p className={styles.descriptionAppToDo}>
          <b>App ToDo</b> es una aplicación con la cual puedes anotar tus tareas
          para no olvidarlas, obteniendo un dia más organizado
        </p>
      </section>
      <section className={styles.sectionDemos}>
        <article className={styles.articleToDo}>
          <DemoAddToDo />
        </article>
        <article className={styles.articleToDoLimit}>
          <DemoAddToDoLimit />
        </article>
      </section>
      <Link href="/api/auth/login" className={styles.linkLogin}>
        <span className={styles.spanBtnLogin}>Iniciar Sesión</span>
        <FiLogIn />
      </Link>
    </main>
  );
}
