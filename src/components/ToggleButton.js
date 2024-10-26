import React from "react";
import "./ToggleButton.css";

const ToggleButton = ({ onToggle, isChecked }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider">
        <span className="slider-inner"></span>
      </span>
    </label>
  );
};

export default ToggleButton;