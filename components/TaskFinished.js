import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import style from "./styles/ToDoFinished.module.css";

export default function TaskFinished({ name, description }) {
  const [showDescription, setShowDescription] = useState();

  const handlerShowDescription = () => {
    showDescription ? setShowDescription(false) : setShowDescription(true);
  };

  return (
    <article className={style.articleTask}>
      <p className={style.nameTask}>{name}</p>
      <button
        className={style.btnShowDescriptionTask}
        onClick={handlerShowDescription}
      >
        {!showDescription ? (
          <IoIosArrowDown className={style.iconShowDescription} />
        ) : (
          <IoIosArrowUp className={style.iconShowDescription} />
        )}
      </button>
      {showDescription && (
        <div className={style.containDescription}>
          <p className={style.description}>{description}</p>
        </div>
      )}
    </article>
  );
}
