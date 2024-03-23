import "./components.css";
import { useState } from "react";

export const Button = ({ type, onClick, name, expandedData, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <button
      onClick={onClick}
      // onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={
        type + "-button button " + (isActive ? `${type}-button-active` : "")
      }
    >
      <div className="button-name">{name}</div>
      {isExpanded && <div className="expanded-data">{expandedData}</div>}
    </button>
  );
};

export default Button;
