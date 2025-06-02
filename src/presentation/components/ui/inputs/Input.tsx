import { forwardRef, type InputHTMLAttributes } from "react";

/**
 * Propiedades para el componente Input.
 * Extiende las propiedades estándar de un input HTML y permite agregar clases personalizadas.
 * @property {string} [className] - Clases CSS adicionales para personalizar el input.
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

/**
 * Componente Input reutilizable.
 * Renderiza un input estilizado con soporte para ref y todas las props estándar de un input.
 * 
 * @param {InputProps} props - Propiedades del input.
 * @param {React.Ref<HTMLInputElement>} ref - Referencia para el input.
 * @returns {JSX.Element} Un elemento input estilizado.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`bg-grayText flex p-2 rounded-lg w-full border border-gray-100 placeholder:text-sm text-gray-800 ${className}`}
    {...props}
  />
));

export default Input;