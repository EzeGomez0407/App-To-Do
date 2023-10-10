"use client";

import React from "react";

import styles from "./styles/HomeWithoutLogin.module.css";
import { DemoAddToDo, DemoAddToDoLimit } from "./DemosComponents";
import { signIn } from "next-auth/react";

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
      <button onClick={() => signIn()} className={styles.linkLogin}>
        Iniciar session
      </button>
    </main>
  );
}
