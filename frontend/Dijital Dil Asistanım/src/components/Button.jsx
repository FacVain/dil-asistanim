import "./components.css";

export const Button = ({ type, onClick, name }) => {
  return (
    <button onClick={onClick} className={type}>
      {name}
    </button>
  );
};

export default Button;
