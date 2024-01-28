import Button from "./Button";
import { DoubleLeftOutlined } from "@ant-design/icons";

const Sidebar = ({
  width,
  height,
  header,
  components,
  buttonType,
  onClick,
}) => {
  return (
    <div className="sidebar" style={{ width: width, height: height }}>
      <div className="sidebar-header">{header}</div>
      {components.map((component) => (
        <Button
          key={component}
          type={buttonType}
          onClick={onClick}
          name={component}
        />
      ))}
      <DoubleLeftOutlined className="sidebar-icon" />
    </div>
  );
};

export default Sidebar;
