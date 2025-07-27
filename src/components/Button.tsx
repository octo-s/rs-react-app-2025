import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`px-6 py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition ${props.className}`}
      type="button"
    >
      {text}
    </button>
  );
};

export default Button;
