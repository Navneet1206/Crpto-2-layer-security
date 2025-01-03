import { ButtonHTMLAttributes, ReactNode } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'px-6 py-3 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};