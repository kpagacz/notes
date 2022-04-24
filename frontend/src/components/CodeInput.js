import React from "react";
import { useNavigate } from "react-router-dom";

const CodeInput = () => {
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/notes/" + event.target[0].value);
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="note-code">Note Code:</label>
        <input type="text" id="note-code" name="note-code" />
        <input type="submit"/>
      </form>
    </div>
  );
};

export default CodeInput;
