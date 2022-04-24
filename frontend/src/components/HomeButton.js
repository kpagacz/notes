import React from "react";
import { useNavigate } from "react-router-dom";

const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return <button onClick={handleClick}>Home</button>;
};

export default HomeButton;
