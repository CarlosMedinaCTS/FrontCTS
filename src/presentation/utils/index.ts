export const colors = {
  obsidian: '#0b0d0e',
  midnightBlue: '#101828',
  darkOlive: '#1C1F1A',
  steelGray: '#3B3C4A',
  mutedTeal: '#4B6B6B',
  dustyPurple: '#5C4B66'
};


export const formatted = (date: string | Date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
};