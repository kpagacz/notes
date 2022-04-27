import React from "react";
import HomeButton from "components/homeButton/HomeButton";
import NoteForm from "components/noteForm/NoteForm";
import styles from "./NoteEditView.module.css";

const NoteEditView = () => {
  return (
    <div className={styles.noteEditView}>
      <HomeButton />
      <NoteForm />
    </div>
  );
};

export default NoteEditView;
