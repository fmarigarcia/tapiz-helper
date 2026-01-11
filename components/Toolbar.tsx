'use client';

import React from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface ToolbarProps {
  onNewProject: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onNewProject }) => {
  const { currentProject, clearGrid, setSelectedLine } = useProjects();

  const handleClearGrid = () => {
    if (currentProject && confirm('¿Estás seguro de que quieres limpiar la cuadrícula?')) {
      clearGrid();
    }
  };

  const handleLineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedLine(value === '' ? null : parseInt(value, 10));
  };

  // Generate line options (counting from bottom to top)
  const lineOptions = currentProject
    ? Array.from({ length: currentProject.rows }, (_, i) => i + 1)
    : [];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-wrap gap-3">
      <button
        onClick={onNewProject}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
      >
        + Nuevo Proyecto
      </button>
      {currentProject && (
        <button
          onClick={handleClearGrid}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
        >
          Limpiar Cuadrícula
        </button>
      )}
      {currentProject && (
        <div className="flex items-center gap-2">
          <label htmlFor="line-selector" className="text-sm font-medium text-gray-700">
            Línea:
          </label>
          <select
            id="line-selector"
            value={currentProject.selectedLine ?? ''}
            onChange={handleLineChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sin selección</option>
            {lineOptions.map((line) => (
              <option key={line} value={line}>
                Línea {line}
              </option>
            ))}
          </select>
        </div>
      )}
      {currentProject && (
        <div className="flex items-center ml-auto text-sm text-gray-600">
          <span className="font-medium">{currentProject.name}</span>
          <span className="ml-2 text-gray-400">
            ({currentProject.rows} × {currentProject.cols})
          </span>
        </div>
      )}
    </div>
  );
};
