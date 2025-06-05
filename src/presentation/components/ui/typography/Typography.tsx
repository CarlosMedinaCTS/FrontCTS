import type { JSX } from "react";

/**
 * Props para los componentes tipográficos.
 * Estas props permiten reutilizar estilos y pasar contenido dinámico a los componentes de texto.
 * @property {React.ReactNode} children - El contenido a mostrar dentro del componente tipográfico, puede ser texto, elementos o componentes React.
 * @property {string} [className] - Clases CSS adicionales para personalizar el estilo del componente.
 */
interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * Componente para títulos H1.
 * Renderiza un elemento <h1> con estilos predeterminados y permite personalización adicional mediante la prop className.
 * Uso recomendado para títulos principales de una página o sección.
 * 
 * @param {Props} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del título.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Un elemento h1 estilizado.
 * @example
 * <Typography.H1>Mi Título Principal</Typography.H1>
 */
const H1 = ({ children, className = "" }: Props): JSX.Element => {
  return (
    <h1 className={`text-2xl font-semibold text-gray-800  ${className}`}>{children}</h1>
  );
};

/**
 * Componente para títulos H2.
 * Renderiza un elemento <h2> con estilos predeterminados y permite personalización adicional mediante la prop className.
 * Uso recomendado para subtítulos o encabezados secundarios.
 * 
 * @param {Props} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del subtítulo.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Un elemento h2 estilizado.
 * @example
 * <Typography.H2>Subtítulo de sección</Typography.H2>
 */
const H2 = ({ children, className = "" }: Props): JSX.Element => {
  return (
    <h2 className={`text-2xl font-medium text-gray-800  ${className}`}>{children}</h2>
  );
};

/**
 * Componente para títulos H3.
 * Renderiza un elemento <h3> con estilos predeterminados y permite personalización adicional mediante la prop className.
 * Uso recomendado para encabezados terciarios o títulos de subsecciones.
 * 
 * @param {Props} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del encabezado.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Un elemento h3 estilizado.
 * @example
 * <Typography.H3>Título terciario</Typography.H3>
 */
const H3 = ({ children, className = "" }: Props): JSX.Element => {
  return (
    <h3 className={`font-medium text-gray-800  ${className}`}>{children}</h3>
  );
};

/**
 * Componente para párrafos.
 * Renderiza un elemento <p> con estilos predeterminados y permite personalización adicional mediante la prop className.
 * Uso recomendado para textos descriptivos, contenido principal o cualquier bloque de texto.
 * 
 * @param {Props} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido del párrafo.
 * @param {string} [props.className] - Clases CSS adicionales.
 * @returns {JSX.Element} Un elemento p estilizado.
 * @example
 * <Typography.P>Este es un párrafo de ejemplo.</Typography.P>
 */
const P = ({ children, className = "" }: Props): JSX.Element => {
  return (
    <p className={`text-sm text-gray-500 wrap-anywhere  ${className}`}>{children}</p>
  );
};

/**
 * Objeto tipográfico que agrupa los componentes H1, H2, H3 y P.
 * Permite importar y utilizar los componentes tipográficos de forma centralizada y consistente en toda la aplicación.
 * @property {typeof H1} H1 - Componente para títulos principales.
 * @property {typeof H2} H2 - Componente para subtítulos.
 * @property {typeof H3} H3 - Componente para encabezados terciarios.
 * @property {typeof P} P - Componente para párrafos.
 * @example
 * import { Typography } from "./Typography";
 * <Typography.H1>Hola</Typography.H1>
 */
export const Typography = {
  H1,
  H2,
  H3,
  P
};