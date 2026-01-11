'use client';

import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface GridProps {
  selectedColor: string;
}

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
    if (maxCells <= 20) return 'w-8 h-8';
    if (maxCells <= 40) return 'w-6 h-6';
    if (maxCells <= 60) return 'w-4 h-4';
    return 'w-3 h-3';
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
