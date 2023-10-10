"use client";

import React, { useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import styles from "../../../styles/Register.module.css";
import { FcGoogle } from "react-icons/fc";
import { userRegister } from "@/src/controllers/clientAutentication";

export default function register() {
  const [userCredentialsRegister, setUserCredentialsRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState([]);

  const handleOnChangeCredentialsRegister = (e) => {
    const { name, value } = e.target;

    setUserCredentialsRegister(() => ({
      ...userCredentialsRegister,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { error, user } = await userRegister(userCredentialsRegister);

      if (error) {
        return setErrorMessage(error);
      }

      await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
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
        >
          Crear Cuenta
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
