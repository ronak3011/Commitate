// A reusable Input component with dark theme aesthetics
const Input = ({ label, id, ...props }) => {
  return (
    <div className="flex flex-col space-y-1 mb-4">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-textMuted">
          {label}
        </label>
      )}
      <input
        id={id}
        className="w-full bg-surface border border-border rounded-md px-3 py-2 text-textMain placeholder-textMuted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
        {...props}
      />
    </div>
  );
};

export default Input;
