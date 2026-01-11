'use client';

import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface GridProps {
  selectedColor: string;
}

// Cell size constants based on grid dimensions
const CELL_SIZE_SMALL = 20; // Threshold for small grids
const CELL_SIZE_MEDIUM = 40; // Threshold for medium grids
const CELL_SIZE_LARGE = 60; // Threshold for large grids

const CELL_CLASS_LARGE = 'w-8 h-8'; // For grids up to 20x20
const CELL_CLASS_MEDIUM = 'w-6 h-6'; // For grids up to 40x40
const CELL_CLASS_SMALL = 'w-4 h-4'; // For grids up to 60x60
const CELL_CLASS_TINY = 'w-3 h-3'; // For grids larger than 60x60

export const Grid: React.FC<GridProps> = ({ selectedColor }) => {
  const { currentProject, updateCell } = useProjects();
  const [isMouseDown, setIsMouseDown] = useState(false);

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        <p>No hay ningún proyecto seleccionado. Crea uno nuevo para empezar.</p>
      </div>
    );
  }

  const handleMouseDown = (row: number, col: number) => {
    setIsMouseDown(true);
    updateCell(row, col, selectedColor);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      updateCell(row, col, selectedColor);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Calculate cell size based on grid dimensions to fit the screen
  const getCellSize = () => {
    const maxCells = Math.max(currentProject.rows, currentProject.cols);
    if (maxCells <= CELL_SIZE_SMALL) return CELL_CLASS_LARGE;
    if (maxCells <= CELL_SIZE_MEDIUM) return CELL_CLASS_MEDIUM;
    if (maxCells <= CELL_SIZE_LARGE) return CELL_CLASS_SMALL;
    return CELL_CLASS_TINY;
  };

  const cellSize = getCellSize();

  return (
    <div className="overflow-auto max-h-[70vh] border-2 border-gray-300 rounded-lg p-4 bg-white">
      <div
        className="inline-block"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {currentProject.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${cellSize} border border-gray-200 cursor-crosshair transition-colors hover:opacity-80`}
                style={{ backgroundColor: cell.color }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
