"use client";

import React, { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { FcTodoList } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import styles from "../../../styles/SignIn.module.css";
import { userLogin } from "@/src/controllers/clientAutentication";
import Loading from "@/src/components/Loading";
import LoaderComponent from "@/src/components/LoaderComponent";
import ModalError from "@/src/components/ModalError";
import { useDispatch } from "@/src/store/StoreProvider";
import { types } from "@/src/store/StoreReducer";

export default function signin() {
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [loaderShow, setLoaderShow] = useState(false);
  const [messageError, setMessageError] = useState([]);
  const [showModalError, setShowModalError] = useState(false);
  const btnCredentials = useRef(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoaderShow(true);

    const { error, user } = await userLogin(userCredentials);

    if (!error.length) {
      setMessageError([]);
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res.error == "password missing") {
        setLoaderShow(false);
        return setShowModalError(true);
      }

      setMessageError([]);
      if (res.error) {
        setLoaderShow(false);
        return setMessageError([res.error]);
      }
      router.push("/");
      return;
    } else {
      setLoaderShow(false);
      return setMessageError(error);
    }
  };

  const handleOnChangeCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentials(() => ({
      ...userCredentials,
      [name]: value,
    }));
  };
  const handleClickChangePassword = () => {
    dispatch({ type: types.SET_PERMISSION_CHANGE_PASSWORD, payload: true });
    router.push("/auth/create-password");
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
        <section className={styles.sectionSignIn}>
          <h2 className={styles.titleSignIn}>Bienvenido</h2>
          <form
            className={styles.formSignIn}
            onChange={handleOnChangeCredentials}
          >
            <div className={styles.containInPut}>
              {/* <label for="email">Email</label> */}
              <input type="email" name="email" placeholder="Email" />
            </div>
            <div className={styles.containInPut}>
              {/* <label for="password"></label> */}
              <input type="password" name="password" placeholder="Contraseña" />
            </div>
            <div className={styles.divContainSpanError}>
              {messageError.length > 0 &&
                messageError.map((err, index) => (
                  <span className={styles.spanError} key={index}>
                    {err}
                  </span>
                ))}
            </div>

            <span className={styles.createAccountSpan}>
              ¿No tienes una cuenta?
              <br />
              <Link href="/auth/register">
                Haz click aquí para crear una cuenta
              </Link>
            </span>

            <button
              className={styles.btnSignInWithEmail}
              ref={btnCredentials}
              onClick={handleSignIn}
            >
              {loaderShow ? <LoaderComponent /> : "Iniciar Sesión"}
            </button>
          </form>

          <hr className={styles.separator} />
          <div className={styles.divContainProviders}>
            <button
              className={styles.btnSignIn}
              onClick={() => signIn("google")}
            >
              <FcGoogle className={styles.iconProvider} />
              Iniciar con Google
            </button>
          </div>
        </section>
      )}
      {showModalError && (
        <ModalError msgError="Se registro con una cuenta de Google, debe crear una contraseña si quiere ingresar de esta forma">
          <div className={styles.containBtnModalError}>
            <button onClick={handleClickChangePassword}>
              Crear contraseña
            </button>
            <button onClick={() => signIn("google")}>
              <FcGoogle className={styles.iconGoogleInModal} />
              Iniciar con Google
            </button>
          </div>
        </ModalError>
      )}
    </>
  );
}
