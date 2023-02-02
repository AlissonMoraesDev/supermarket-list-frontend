import './index.css';

export const Button = ({ children, onClick, variant, icon }) => {
  return (
    <button onClick={onClick} className={`${variant === "outline" ? "outline" : "main"}`}>
      {icon && (
        <img 
          className='button-icon'
          src={`/images/${icon}.svg`} 
          alt={`supermarket_icon${icon}`} 
        />
        )}
      {children}
    </button>
  );
}