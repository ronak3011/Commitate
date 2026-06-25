// A reusable Button component with Linear-style sleekness
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-[var(--bg-color)] hover:brightness-110 focus:ring-primary shadow-lg shadow-primary/30",
    secondary: "bg-surface border border-border text-textMain hover:brightness-125 focus:ring-textMuted",
    accent: "bg-textMain text-[var(--bg-color)] hover:brightness-110 focus:ring-textMain",
    ghost: "bg-transparent text-textMuted hover:text-textMain hover:bg-surface/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
