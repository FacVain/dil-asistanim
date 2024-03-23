const Card = ({ title, createdTime, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-title">{title}</div>
      <div className="card-time">{createdTime}</div>
    </div>
  );
};

export default Card;
