const Card = ({ title, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;
