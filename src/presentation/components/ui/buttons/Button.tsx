interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button = ({ children, ...props } : ButtonProps ) => {
  return (
    <button
      className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-3 text-sm cursor-pointer"
      {...props}
    >
      {children}
    </button>
  )
}

export default Button