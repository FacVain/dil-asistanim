import "./loading.scss";

const LoadingBox = ({ height, width }) => {
  return (
    <div className="holder" style={{ height: height, width: width }}>
      <div className="preloader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingBox;
