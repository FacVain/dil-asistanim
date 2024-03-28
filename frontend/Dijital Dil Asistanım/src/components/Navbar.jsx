const Navbar = ({ title, components, onClick }) => {
  return (
    <div className="navbar">
      <div className="navbar-title">{title}</div>
      {components.map((component) => (
        <div
          className={`navbar-item ${component._id === window.location.pathname.split("/")[2] ? "navbar-item-active" : ""}`}
          key={component._id}
          onClick={() => onClick(component._id)}
        >
          {component.userInput.substring(0, 50) + "..."}
        </div>
      ))}
    </div>
  );
};

export default Navbar;
