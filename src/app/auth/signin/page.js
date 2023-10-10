"use client";
import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import styles from "../../../styles/SignIn.module.css";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { userLogin } from "@/src/controllers/clientAutentication";

export default function signin() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [messageError, setMessageError] = useState([]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { error, user } = await userLogin(userCredentials);

    if (!error.length) {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });

      return;
    } else {
      setMessageError(error);
    }
  };

  const handleOnChangeCredentials = (e) => {
    const { name, value } = e.target;
    setUserCredentials(() => ({
      ...userCredentials,
      [name]: value,
    }));
  };

  return (
    <section className={styles.sectionSignIn}>
      <h2 className={styles.titleSignIn}>Bienvenido</h2>
      <form className={styles.formSignIn} onChange={handleOnChangeCredentials}>
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

        <button className={styles.btnSignInWithEmail} onClick={handleSignIn}>
          Iniciar Sesión
        </button>
      </form>

      <hr className={styles.separator} />
      <div className={styles.divContainProviders}>
        <button className={styles.btnSignIn} onClick={() => signIn("google")}>
          <FcGoogle className={styles.iconProvider} />
          Iniciar con Google
        </button>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return { props: { providers: providers ?? [] } };
}
