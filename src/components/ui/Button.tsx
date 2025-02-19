import React from "react";
import PropTypes from "prop-types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode | null;
  border?: boolean;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon = null,
  border = "false",
  backgroundColor = "bg-[--prime]",
  hoverBackgroundColor = "hover:bg-[--hover-prime]",
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

export default Button;
