import React from "react";
import { useNavigate } from "react-router-dom";
import CodeInput from "components/codeInput/CodeInput";
import style from "./HomeView.module.css";

const HomeView = () => {
  var navigate = useNavigate();

  const handleNewNoteClick = () => {
    console.log("New note clicked");
    navigate("/write");
  };

  return (
    <div>
      <CodeInput />
      <button onClick={handleNewNoteClick} className={style.newNoteButton}>Create a New Note</button>
    </div>
  );
};

export default HomeView;
