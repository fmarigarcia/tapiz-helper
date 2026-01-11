'use client';

import React from 'react';
import { useProjects } from '@/contexts/ProjectContext';

export const RowSelector: React.FC = () => {
  const { currentProject, setSelectedLine } = useProjects();

  if (!currentProject) return null;

  const currentLine = currentProject.selectedLine ?? 1;
  const maxLines = currentProject.rows;

  const handleIncrement = () => {
    const newLine = Math.min(currentLine + 1, maxLines);
    setSelectedLine(newLine);
  };

  const handleDecrement = () => {
    const newLine = Math.max(currentLine - 1, 1);
    setSelectedLine(newLine);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxLines) {
      setSelectedLine(value);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl rounded-lg p-4 flex flex-col items-center gap-3">
      <button
        onClick={handleIncrement}
        disabled={currentLine >= maxLines}
        className="w-12 h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-2xl font-bold"
      >
        ↑
      </button>
      <div className="flex flex-col items-center">
        <input
          type="number"
          min="1"
          max={maxLines}
          value={currentLine}
          onChange={handleInputChange}
          className="w-16 text-4xl font-bold text-center text-gray-800 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-xs text-gray-500 mt-1">de {maxLines}</span>
      </div>
      <button
        onClick={handleDecrement}
        disabled={currentLine <= 1}
        className="w-12 h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-2xl font-bold"
      >
        ↓
      </button>
    </div>
  );
};
