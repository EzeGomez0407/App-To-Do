"use client";

import React, { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { FcTodoList } from "react-icons/fc";

import styles from "../../../styles/Register.module.css";
import LoaderComponent from "@/src/components/LoaderComponent";
import { userRegister } from "@/src/controllers/clientAutentication";
import Loading from "@/src/components/Loading";

export default function register() {
  const [userCredentialsRegister, setUserCredentialsRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loaderShow, setLoaderShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const btnCredentials = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleOnChangeCredentialsRegister = (e) => {
    const { name, value } = e.target;

    setUserCredentialsRegister(() => ({
      ...userCredentialsRegister,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage([]);
    setLoaderShow(true);

    const { error, user } = await userRegister(userCredentialsRegister);

    if (!error) {
      const res = await signIn("credentials", {
        email: user.email,
        password: userCredentialsRegister.password,
        redirect: false,
      });

      if (res.error) {
        setLoaderShow(false);
        return setErrorMessage([res.error]);
      }
      router.push("/");
      return;
    } else {
      setLoaderShow(false);
      return setErrorMessage(error);
    }
  };

  useEffect(() => {
    session?.user && router.push("/");
  }, [session]);

  useEffect(() => {
    if (btnCredentials.current) {
      loaderShow
        ? (btnCredentials.current.style.backgroundColor = "#646566")
        : (btnCredentials.current.style.backgroundColor = "#3f51b5");
    }
  }, [loaderShow]);

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
        <section className={styles.sectionRegister}>
          <h2 className={styles.titleRegister}>Bienvenido</h2>
          <form
            className={styles.formSignIn}
            onChange={handleOnChangeCredentialsRegister}
          >
            <div className={styles.containInPut}>
              {/* <label for="password"></label> */}
              <input
                type="text"
                autoComplete="off"
                name="username"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className={styles.containInPut}>
              {/* <label for="email">Email</label> */}
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles.containInPut}>
              {/* <label for="password"></label> */}
              <input type="password" name="password" placeholder="Contraseña" />
            </div>

            <div className={styles.divContainSpanError}>
              {errorMessage.length > 0 &&
                errorMessage.map((err, index) => (
                  <span className={styles.spanError} key={index}>
                    {err}
                  </span>
                ))}
            </div>
            <button
              className={styles.btnRegisterWithEmail}
              onClick={handleRegister}
              ref={btnCredentials}
            >
              {loaderShow ? <LoaderComponent /> : "Crear Cuenta"}
            </button>
          </form>
          <span className={styles.signInSpan}>
            ¿Ya tienes una cuenta?
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
              className={styles.btnHaveAnAccount}
            >
              Haz click aquí para iniciar sesión
            </button>
          </span>

          <hr className={styles.separator} />
          <div className={styles.divContainProviders}>
            <button
              className={styles.btnSignInOAuthProviders}
              onClick={() => signIn("google")}
            >
              <FcGoogle className={styles.iconProvider} />
              Registrar con Google
            </button>
          </div>
        </section>
      )}
    </>
  );
}
