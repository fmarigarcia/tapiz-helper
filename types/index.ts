export interface Cell {
  color: string;
}

export interface Project {
  id: string;
  name: string;
  rows: number;
  cols: number;
  grid: Cell[][];
  createdAt: string;
  updatedAt: string;
}

export const PREDEFINED_COLORS = [
  '#FFFFFF', // Blanco
  '#000000', // Negro
  '#FF0000', // Rojo
  '#00FF00', // Verde
  '#0000FF', // Azul
  '#FFFF00', // Amarillo
  '#FF00FF', // Magenta
  '#00FFFF', // Cian
  '#FFA500', // Naranja
  '#800080', // Púrpura
  '#FFC0CB', // Rosa
  '#A52A2A', // Marrón
  '#808080', // Gris
  '#FFD700', // Oro
  '#C0C0C0', // Plata
  '#8B4513', // Marrón oscuro
];
