'use client';

import React from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface ToolbarProps {
  onNewProject: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onNewProject }) => {
  const { currentProject, clearGrid } = useProjects();

  const handleClearGrid = () => {
    if (currentProject && confirm('¿Estás seguro de que quieres limpiar la cuadrícula?')) {
      clearGrid();
    }
  };

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
