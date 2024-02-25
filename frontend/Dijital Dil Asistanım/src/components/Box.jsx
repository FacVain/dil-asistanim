import { useEffect, useState } from "react";
import "./components.css";

const Box = ({ size }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (size === "small") {
      setStyle({ width: "10%", height: "10%" });
    } else if (size === "medium") {
      setStyle({ width: "25%", height: "25%" });
    } else if (size === "large") {
      setStyle({ width: "50%", height: "50%" });
    }
  }, [size]);

  return <div className="box" style={style}></div>;
};

export default Box;
