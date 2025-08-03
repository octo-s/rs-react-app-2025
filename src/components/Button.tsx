import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'primary',
  children,
  ...props
}: ButtonProps) => {
  const base = `px-6 py-2 rounded font-semibold shadow outline-none border-none transition ${props.className}`;
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-red-900',
    secondary: 'bg-white text-blue-700 hover:bg-blue-50 dark:text-red-900',
  };

  return (
    <button {...props} className={`${base} ${variants[variant]}`} type="button">
      {text ?? children ?? ''}
    </button>
  );
};

export default Button;
