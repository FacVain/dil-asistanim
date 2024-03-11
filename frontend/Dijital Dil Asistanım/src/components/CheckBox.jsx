export const Checkbox = ({ label, value, onChange }) => {
  return (
    <label className="checkbox-label">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={value}
        onChange={onChange}
        id={label}
      />
      {label}
    </label>
  );
};
