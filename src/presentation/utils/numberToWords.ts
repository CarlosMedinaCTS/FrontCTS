type Options = {
  unidad?: string;
  mayus?: boolean;
  decimalesSiempre?: boolean;
};

const toWords = (opt: Options = {}) => {
  const options = {
    unidad: opt.unidad ?? 'MXN',
    mayus: opt.mayus !== false,
    decimalesSiempre: opt.decimalesSiempre ?? false,
  };

  const unidades = (n: number): string =>
    ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"][n] || "";

  const decenas = (n: number): string => {
    const d = Math.floor(n / 10), u = n % 10;
    if (d === 1) {
      return ["diez", "once", "doce", "trece", "catorce", "quince"][u] || `dieci${unidades(u)}`;
    }
    if (d === 2) return u === 0 ? "veinte" : `veinti${unidades(u)}`;
    const base = ["", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"][d] || "";
    return base + (u ? ` y ${unidades(u)}` : "");
  };

  const centenas = (n: number): string => {
    const c = Math.floor(n / 100), resto = n % 100;
    const d = decenas(resto);
    switch (c) {
      case 1: return resto ? `ciento ${d}` : "cien";
      case 2: return `doscientos ${d}`;
      case 3: return `trescientos ${d}`;
      case 4: return `cuatrocientos ${d}`;
      case 5: return `quinientos ${d}`;
      case 6: return `seiscientos ${d}`;
      case 7: return `setecientos ${d}`;
      case 8: return `ochocientos ${d}`;
      case 9: return `novecientos ${d}`;
      default: return d;
    }
  };

  const miles = (n: number): string => {
    const m = Math.floor(n / 1000), r = n % 1000;
    const mil = m === 1 ? "mil" : `${centenas(m)} mil`;
    return m ? `${mil} ${centenas(r)}` : centenas(r);
  };

  const millones = (n: number): string => {
    const mm = Math.floor(n / 1_000_000), r = n % 1_000_000;
    const millon = mm === 1 ? "un millón" : `${handle(mm)} millones`;
    return mm ? `${millon} ${handle(r)}` : handle(r);
  };

  const handle = (n: number): string => {
    if (n < 10) return unidades(n);
    if (n < 100) return decenas(n);
    if (n < 1000) return centenas(n);
    if (n < 1_000_000) return miles(n);
    return millones(n);
  };

  return (input: number | string): string => {
    const num = Number(input);
    if (isNaN(num)) return '';
    const entero = Math.floor(num);
    let decimal = '';

    const [decPart] = num.toString().split(".");
    if (decPart) {
      decimal = decPart.padEnd(2, '0').substring(0, 2);
    } else if (options.decimalesSiempre) {
      decimal = "00";
    }

    let texto = num === 0 ? "cero" : handle(entero);
    if (decimal) texto += ` ${decimal}/100`;
    if (options.mayus) texto = texto.toUpperCase();
    if (options.unidad) texto += ` ${options.unidad}`;
    return texto.replace(/ +/g, " ").trim();
  };
};

export default toWords;
