import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./CodeInput.module.css";

const CodeInput = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/notes/" + event.target[0].value);
  };

  return (
    <form onSubmit={onSubmitHandler} className={style.inputForm}>
      <input type="text" id="note-code" name="note-code" placeholder="Input a note's secret to read it... "/>
      <input type="submit" value="Discover the Note" />
    </form>
  );
};

export default CodeInput;
