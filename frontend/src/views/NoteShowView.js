import React, { useEffect, useState } from "react";
import HomeButton from "components/HomeButton";
import { useParams } from "react-router-dom";
import getNote from "httpLayer/getNote";

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
        return (
          <div>
            <p>ID: {id} </p>
            <p>Content: {note.noteContent}</p>
            <p>ExpirationData: {note.expirationDate}</p>
            <p>CreatedBy: {note.createdBy}</p>
          </div>
        );
      case 404:
        return <div>Couldn't find your note :(</div>;
      default:
        return <div>Loading</div>;
    }
  };

  return (
    <div>
      <HomeButton />
      {statusSwitch(statusCode)}
    </div>
  );
};

export default NoteShowView;
