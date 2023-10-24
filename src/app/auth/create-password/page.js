"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useStore } from "@/src/store/StoreProvider";
import { FcGoogle } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";

import styles from "../../../styles/create-password.module.css";
import { signIn } from "next-auth/react";
import Loading from "@/src/components/Loading";

function CreatePassword() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { permissionChangePassword } = useStore();
  const [messageError, setMessageError] = useState([]);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleOnClickChangePassword = async (e) => {
    e.preventDefault();
    const result = await (
      await fetch("/api/new-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
    ).json();

    console.log(result);
    if (result.error) {
      return setMessageError([result.error]);
    }

    if (result.user?.email) {
      const res = await signIn("credentials", {
        email: result.user.email,
        password: userData.password,
        redirect: false,
      });
      setMessageError([]);
      if (res.error) {
        return setMessageError([res.error]);
      }
      router.push("/");
      return;
    }
  };

  const handleOnChangeData = (e) => {
    const { name, value } = e.target;

    setUserData(() => ({
      ...userData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Aquí debes definir tu lógica de autorización.
    // Por ejemplo, si el usuario no cumple con ciertos requisitos, redirige a otra página.
    if (!true) {
      router.push("/");
    }
  }, [permissionChangePassword]);

  useEffect(() => {
    session?.user && router.push("/");
  }, [session]);

  // Renderiza tu componente normalmente si el usuario cumple con los requisitos.
  return (
    <>
      {status == "loading" || status == "authenticated" ? (
        <main className={styles.mainLoading}>
          <span className={styles.simbolToDoLoading}>
            <FcTodoList className={styles.iconTodoLoading} />
            ToDo
          </span>
          <Loading />
        </main>
      ) : (
        <main className={styles.mainNewPassword}>
          <section className={styles.sectionNewPassword}>
            <form
              className={styles.formCreatePassword}
              onChange={handleOnChangeData}
            >
              <div className={styles.containInPut}>
                <input type="email" name="email" placeholder="Email" />
              </div>
              <div className={styles.containInPut}>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
              </div>
              <div className={styles.divContainSpanError}>
                {messageError.length > 0 &&
                  messageError.map((err, index) => (
                    <span className={styles.spanError} key={index}>
                      {err}
                    </span>
                  ))}
              </div>
            </form>
            <div className={styles.containBtns}>
              <button
                className={styles.btn}
                onClick={handleOnClickChangePassword}
              >
                Crear contraseña
              </button>
              <button className={styles.btn} onClick={() => signIn("google")}>
                <FcGoogle className={styles.iconGoogleInModal} />
                Iniciar con Google
              </button>
            </div>
          </section>
        </main>
      )}
    </>
  );
}

// export async function getServerSideProps(context) {
//   // Realiza alguna lógica para determinar si el usuario cumple con los requisitos.
//   // Por ejemplo, verifica si está autenticado o si cumple con otros criterios.
//   //   const someData = ...; // Lógica de autorización aquí

//   return {
//     props: { someData },
//   };
// }

export default CreatePassword;
