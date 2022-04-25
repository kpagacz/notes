import createNote from "httpLayer/postNotes";
import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useNavigate } from "react-router-dom";

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
          }, 2500);
        }
        else setSavingNoteStatus("savingFailure");
      } catch (exception) {
        setSavingNoteStatus("savingFailure");
      }
    };
    getResponse();
  };

  const [authorInputEmpty, setAuthorInputEmpty] = useState(true);
  const [noteInputEmpty, setNoteInputEmpty] = useState(true);
  const [submitButtonDisabled, setSubmitButtonDisables] = useState(true);

  const handleAuthorChange = (event) => {
    event.preventDefault();
    setCreatedBy(event.target.value);
    setAuthorInputEmpty(event.target.value === "");
    setSubmitButtonDisables(authorInputEmpty || noteInputEmpty);
  };

  const handleNoteChange = (event) => {
    event.preventDefault();
    setNoteContent(event.target.value);
    setNoteInputEmpty(event.target.value === "");
    setSubmitButtonDisables(authorInputEmpty || noteInputEmpty);
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
        savingMessage = "Note saved successfully! You will be redirected to the note's page soon.";
        break;
      default:
        savingMessage = "";
        break;
    }

    return (
      <div className={"note-form__status--" + savingNoteStatus}>
        {savingMessage}
      </div>
    );
  };

  return (
    <div>
      <form className="note-form" onSubmit={handleSaveNote}>
        <textarea
          rows="10"
          columns="50"
          placeholder="Your new note..."
          onChange={handleNoteChange}
        />
        <label>Expiration Date:</label>
        <DateTimePicker onChange={setExpirationDate} value={expirationDate} />
        <label htmlFor="created-by">Author:</label>
        <input type="text" id="created-by" onChange={handleAuthorChange} />
        <button disabled={submitButtonDisabled} type="submit">
          Save the note
        </button>
      </form>
      {informAboutSavingStatus()}
    </div>
  );
};

export default NoteForm;
