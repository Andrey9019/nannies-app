import PropTypes from "prop-types";

const Button = ({
  text,
  icon = null,
  border = "false",
  backgroundColor = "bg-[#103931]",
  hoverBackgroundColor = "hover:bg-white",
  hoverTextColor = "hover:text-black",
  className = "",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`
        flex items-center justify-center px-6 py-3 font-bold 
        text-white rounded-full transition-all duration-300 
        ${backgroundColor} ${hoverBackgroundColor} ${hoverTextColor}
        ${border ? "outline outline-2 outline-gray-200" : ""}
        ${className}
      `}
    >
      {text}
      {icon && <span className="ml-4">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.node,
  border: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
};

export default Button;
