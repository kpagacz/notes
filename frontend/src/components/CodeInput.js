import React from "react";

const CodeInput = (props) => {
  return (
    <div>
      <form>
        <label htmlFor="note-code">Note Code:</label>
        <input type="text" id="note-code" name="note-code" />
        <input type="submit" onClick={props.onClick} />
      </form>
    </div>
  );
};

export default CodeInput;
