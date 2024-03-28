import { useState } from "react";
import Button from "./Button";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const Sidebar = ({
  width,
  height,
  header,
  components,
  bottomComponents,
  buttonType,
  onClicks,
  expandedData,
  notClosable,
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
            onClick={onClicks[index]}
            name={component}
            expandedData={expandedData && expandedData[index]}
            isActive={window.location.pathname.includes(
              component.toLowerCase(),
            )}
          />
        ))}
        <div className="sidebar-footer">
          {bottomComponents.map((component, index) => (
            <Button
              key={component}
              type={buttonType}
              onClick={onClicks[components.length + index]}
              name={component}
            />
          ))}
        </div>
      </div>
      {notClosable ? null : isOpen ? (
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
