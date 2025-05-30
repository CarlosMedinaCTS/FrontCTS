
interface Props{
    children: React.ReactNode;
    className?: string;
}

 const H1 = ( { children, className = "" } : Props) => {
  return (
    <h1 className={`text-2xl font-semibold text-gray-800  ${className}`}>{children}</h1>
  )
}

 const H2 = ( { children, className = "" } : Props) => {
  return (
    <h2 className={`text-2xl font-medium text-gray-800  ${className}`}>{children}</h2>
  )
}
 const H3 = ( { children, className = "" } : Props) => {
  return (
    <h3 className={`font-medium text-gray-800  ${className}`}>{children}</h3>
  )
}

 const P = ( { children, className = "" } : Props) => {
  return (
    <p className={`text-sm text-gray-500  ${className}`}>{children}</p>
  )
}


export const Typography = {
  H1,
  H2,
  H3,
  P
};