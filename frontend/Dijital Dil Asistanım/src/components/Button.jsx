import "./components.css";
import { useState } from "react";

export const Button = ({ type, onClick, name, expandedData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <button
      onClick={onClick}
      // onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={type}
    >
      <div className="button-name">{name}</div>
      {isExpanded && <div className="expanded-data">{expandedData}</div>}
    </button>
  );
};

export default Button;
