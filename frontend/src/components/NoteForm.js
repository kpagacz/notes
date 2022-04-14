import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

const NoteForm = () => {
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [noteText, setNoteText] = useState("");

  const handleSaveNote = (event) => {
    event.preventDefault();
    console.log("Save the note clicked");
    console.log("note: " + noteText);
  };

  return (
    <div>
      <form className="note-form" onSubmit={handleSaveNote}>
        <textarea
          rows="10"
          columns="50"
          placeholder="Your new note..."
          onChange={(e) => setNoteText(e.target.value)}
        />
        <DateTimePicker onChange={setExpirationDate} value={expirationDate} />
        <button type="submit">Save the note</button>
      </form>
    </div>
  );
};

export default NoteForm;
