import React from "react";
import { useNavigate } from "react-router-dom";

import CodeInput from "components/CodeInput";

const HomeView = () => {
  var navigate = useNavigate();

  const handleNoteCodeSubmitClick = () => {
    console.log("Submit button clicked");
  };

  const handleNewNoteClick = () => {
    console.log("New note clicked");
    navigate("/write");
  };

  return (
    <div>
      <CodeInput onClick={handleNoteCodeSubmitClick} />
      <button onClick={handleNewNoteClick}>Create a New Note</button>
    </div>
  );
};

export default HomeView;
