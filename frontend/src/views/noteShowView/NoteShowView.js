import React, { useEffect, useState } from "react";
import HomeButton from "components/homeButton/HomeButton";
import { useParams } from "react-router-dom";
import getNote from "httpLayer/getNote";
import styles from "./NoteShowView.module.css";

const NoteShowView = () => {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [statusCode, setStatusCode] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getNote(id);
        if (result.data === "") throw new Error();
        setStatusCode(result.statusCode);
        setNote(result.data);
      } catch (exception) {
        setStatusCode(404);
      }
    };
    getData();
  }, [id]);

  const statusSwitch = (statusCode) => {
    switch (statusCode) {
      case 200:
        const date = new Date(note.expirationDate * 1000);
        return (
          <div className={styles.noteShow}>
            <p>Note says:</p>
            <p>{note.noteContent}</p>
            <p>Authored by: {note.createdBy}. Expires on {date.toUTCString()}</p>
            <p>The secret of your note: {note.id}</p>
            <p>You can use the secret to revisit your note and share it with others.</p>
          </div>
        );
      case 404:
        return <div>Couldn't find your note :(</div>;
      default:
        return <div>Loading</div>;
    }
  };

  return (
    <div className={styles.noteShowWrapper}>
      <HomeButton />
      {statusSwitch(statusCode)}
    </div>
  );
};

export default NoteShowView;
