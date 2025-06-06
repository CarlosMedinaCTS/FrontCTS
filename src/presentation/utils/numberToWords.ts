function toWords(numero: number): string {
  // Validar que el número esté en el rango soportado
  if (numero < 0 || numero > 1000000 || !Number.isInteger(numero)) {
    throw new Error('El número debe ser un entero entre 0 y 1,000,000');
  }

  // Casos especiales
  if (numero === 0) return 'cero';
  if (numero === 1000000) return 'un millón';

  // Arrays con las palabras básicas
  const unidades = [
    '', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
    'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'
  ];

  const decenas = [
    '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'
  ];

  const centenas = [
    '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos',
    'seiscientos', 'setecientos', 'ochocientos', 'novecientos'
  ];

  function convertirCentenas(num: number): string {
    if (num === 0) return '';
    if (num === 100) return 'cien';

    let resultado = '';

    // Centenas
    if (num >= 100) {
      resultado += centenas[Math.floor(num / 100)];
      num %= 100;
      if (num > 0) resultado += ' ';
    }

    // Decenas y unidades
    if (num >= 20) {
      const dec = Math.floor(num / 10);
      const uni = num % 10;
      resultado += decenas[dec];
      if (uni > 0) {
        resultado += ' y ' + unidades[uni];
      }
    } else if (num > 0) {
      resultado += unidades[num];
    }

    return resultado;
  }

  function convertirMiles(num: number): string {
    if (num === 0) return '';
    if (num === 1) return 'mil';
    
    const miles = convertirCentenas(num);
    return miles + ' mil';
  }

  let resultado = '';

  // Manejar miles
  if (numero >= 1000) {
    const miles = Math.floor(numero / 1000);
    resultado += convertirMiles(miles);
    numero %= 1000;
    if (numero > 0) resultado += ' ';
  }

  // Manejar centenas, decenas y unidades
  if (numero > 0) {
    resultado += convertirCentenas(numero);
  }

  return resultado.trim().toUpperCase();
}

// Exportar la función para uso externo
export { toWords };