import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`bg-grayText flex p-2 rounded-lg w-full border border-gray-100 placeholder:text-sm text-gray-800 ${className}`}
    {...props}
  />
));

export default Input;