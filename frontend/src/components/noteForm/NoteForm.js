import createNote from "httpLayer/postNotes";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";
import styles from "./NoteForm.module.css";

const NoteForm = () => {
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [createdBy, setCreatedBy] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [savingNoteStatus, setSavingNoteStatus] = useState("notSaving");
  const navigate = useNavigate();

  const handleSaveNote = (event) => {
    event.preventDefault();
    const expirationTime = Math.floor((expirationDate - Date.now()) / 1000);

    setSavingNoteStatus("saving");
    const getResponse = async () => {
      try {
        const response = await createNote(
          noteContent,
          createdBy,
          expirationTime
        );
        if (response.statusCode === 201) {
          setSavingNoteStatus("savingSuccess");
          setTimeout(() => {
            navigate("/notes/" + response.data.id);
          }, 5000);
        } else setSavingNoteStatus("savingFailure");
      } catch (exception) {
        setSavingNoteStatus("savingFailure");
      }
    };
    getResponse();
  };


  const handleAuthorChange = (event) => {
    event.preventDefault();
    setCreatedBy(event.target.value);
  };

  const handleNoteChange = (event) => {
    event.preventDefault();
    setNoteContent(event.target.value);
  };

  const informAboutSavingStatus = () => {
    let savingMessage = "";
    switch (savingNoteStatus) {
      case "saving":
        savingMessage = "Please wait while the note is being saved...";
        break;
      case "savingFailure":
        savingMessage = "Saving note failed. Try again later.";
        break;
      case "savingSuccess":
        savingMessage =
          "Note saved successfully! You will be redirected to the note's page soon.";
        break;
      default:
        savingMessage = "";
        break;
    }

    return <div className={styles[savingNoteStatus]}>{savingMessage}</div>;
  };

  return (
    <div className={styles.noteFormWrapper}>
      <form onSubmit={handleSaveNote} className={styles.noteForm}>
        <textarea
          placeholder="Your new note..."
          onChange={handleNoteChange}
          className={styles.textarea}
          required
        />
        <input
          type="text"
          id="created-by"
          onChange={handleAuthorChange}
          placeholder="Author..."
          className={styles.authorInput}
          required
        />
        <label className={styles.expirationLabel}>Expire On:</label>
        <DateTimePicker
          onChange={setExpirationDate}
          value={expirationDate}
          className={styles.datepicker}
          placeholderText="Pick the expiration date..."
        />
        <button
          className="noteButton"
          type="submit"
        >
          Save the note
        </button>
      </form>
      {informAboutSavingStatus()}
    </div>
  );
};

export default NoteForm;
