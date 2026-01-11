'use client';

import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';
import { Cell } from '@/types';

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

// Function to calculate point numbers for a line
const calculatePointNumbers = (
  row: Cell[],
  lineNumber: number
): number[] => {
  const isOddLine = lineNumber % 2 === 1;
  const cellColors = row.map((cell) => cell.color);
  
  // For even lines, reverse the array for processing
  const colors = isOddLine ? cellColors : [...cellColors].reverse();
  
  const pointNumbers: number[] = [];
  let currentCount = 1;
  let previousColor = colors[0];
  
  for (let i = 0; i < colors.length; i++) {
    const currentColor = colors[i];
    
    // Reset counter when color changes
    if (currentColor !== previousColor) {
      currentCount = 1;
    }
    
    pointNumbers.push(currentCount);
    currentCount++;
    previousColor = currentColor;
  }
  
  // For even lines, reverse the result back
  return isOddLine ? pointNumbers : pointNumbers.reverse();
};

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
  
  // Determine font size based on cell size
  const getFontSize = () => {
    if (cellSize === CELL_CLASS_LARGE) return 'text-xs';
    if (cellSize === CELL_CLASS_MEDIUM) return 'text-[10px]';
    if (cellSize === CELL_CLASS_SMALL) return 'text-[8px]';
    return 'text-[6px]';
  };
  
  const fontSize = getFontSize();

  return (
    <div className="overflow-auto max-h-[70vh] border-2 border-gray-300 rounded-lg p-4 bg-white">
      <div
        className="inline-block"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {currentProject.grid.map((row, rowIndex) => {
          // Calculate line number (1-based, counting from bottom)
          const lineNumber = currentProject.rows - rowIndex;
          const isSelectedLine = currentProject.selectedLine === lineNumber;
          const pointNumbers = isSelectedLine
            ? calculatePointNumbers(row, lineNumber)
            : [];

          return (
            <div key={rowIndex} className="flex">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${cellSize} border border-gray-200 cursor-crosshair transition-colors hover:opacity-80 relative flex items-center justify-center`}
                  style={{ backgroundColor: cell.color }}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                >
                  {isSelectedLine && (
                    <span
                      className={`${fontSize} font-bold pointer-events-none select-none`}
                      style={{
                        color: cell.color === '#FFFFFF' || cell.color === '#FFFF00' || cell.color === '#00FFFF' || cell.color === '#FFC0CB' || cell.color === '#FFD700' || cell.color === '#C0C0C0'
                          ? '#000000'
                          : '#FFFFFF',
                        textShadow: '0 0 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {pointNumbers[colIndex]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
