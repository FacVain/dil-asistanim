import { useState } from "react";
import Button from "./Button";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const Sidebar = ({
  width,
  height,
  header,
  components,
  buttonType,
  onClick,
  expandedData,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      style={{ width: width, height: height }}
      className={`sidebar${!isOpen ? " sidebar-closed" : ""}`}
    >
      <div className="sidebar-header">{header}</div>
      <div className="sidebar-body">
        {components.map((component, index) => (
          <Button
            key={component}
            type={buttonType}
            onClick={onClick}
            name={component}
            expandedData={expandedData[index]}
          />
        ))}
      </div>
      {isOpen ? (
        <DoubleLeftOutlined
          className="sidebar-close-icon"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      ) : (
        <DoubleRightOutlined
          className="sidebar-open-icon"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default Sidebar;
