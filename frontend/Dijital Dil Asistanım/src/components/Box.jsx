import { useEffect, useState } from "react";
import "./components.css";

const Box = ({ size, content }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (size === "small") {
      setStyle({ width: "20vw", height: "10vh" });
    } else if (size === "medium") {
      setStyle({ width: "40vw", height: "20vh" });
    } else if (size === "large") {
      // setStyle({ width: "60vw", height: "30vh" });
    }
  }, [size]);

  return (
    <div className="box" style={style}>
      {content}
    </div>
  );
};

export default Box;
