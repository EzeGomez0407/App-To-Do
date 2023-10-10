export const userRegister = async ({ username, email, password }) => {
  const fieldsOK = {
    username_ok: username.length < 3,
    email_ok: email.length < 10,
    password_ok: password.length < 4,
  };
  console.log({ username, email, password });
  console.log(fieldsOK);

  if (fieldsOK.username_ok && fieldsOK.email_ok && fieldsOK.password_ok) {
    return {
      error: [
        "el nombre de usuario debe contener al menos 3 caracteres",
        "ingresa un email valido",
        "la contraseña debe tener al menos 4 caracteres",
      ],
    };
  } else if (fieldsOK.username_ok && fieldsOK.email_ok) {
    return {
      error: [
        "el nombre de usuario debe contener al menos 3 caracteres",
        "ingresa un email valido",
      ],
    };
  } else if (fieldsOK.email_ok && fieldsOK.password_ok) {
    return {
      error: [
        "ingresa un email valido",
        "la contraseña debe tener al menos 4 caracteres",
      ],
    };
  } else if (fieldsOK.username_ok && fieldsOK.password_ok) {
    return {
      error: [
        "el nombre de usuario debe contener al menos 3 caracteres",
        "la contraseña debe tener al menos 4 caracteres",
      ],
    };
  } else if (fieldsOK.username_ok) {
    return {
      error: ["el nombre de usuario debe contener al menos 3 caracteres"],
    };
  } else if (fieldsOK.email_ok) {
    return {
      error: ["ingresa un email valido"],
    };
  } else if (fieldsOK.password_ok) {
    return {
      error: ["la contraseña debe tener al menos 4 caracteres"],
    };
  } else if (!validateEmailAddress(email))
    return { error: ["ingresa un email valido"] };

  try {
    const { error, message, user } = await (
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      })
    ).json();

    if (error) {
      return {
        error: [error],
      };
    }

    return { error, message, user };
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async ({ email, password }) => {
  const fieldsOK = {
    email_ok: email.length < 10,
    password_ok: password.length < 4,
  };

  if (fieldsOK.email_ok && fieldsOK.password_ok) {
    return {
      error: [
        "ingresa un email valido",
        "la contraseña debe tener al menos 4 caracteres",
      ],
    };
  } else if (fieldsOK.email_ok) {
    return {
      error: ["ingresa un email valido"],
    };
  } else if (fieldsOK.password_ok) {
    return {
      error: ["la contraseña debe tener al menos 4 caracteres"],
    };
  } else if (!validateEmailAddress(email))
    return { error: ["ingresa un email valido"] };

  const { error, user } = await (
    await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
  ).json();

  return {
    error: error == null ? [] : [error],
    user,
  };
};

/* NO TERMINA DE INICIAR SESION, NO REDIRECCIONA AL HOME PARA COMENZAR A ANOTAR LAS TAREAS */

function validateEmailAddress(email) {
  const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return patron.test(email);
}
