'use client';

import React from 'react';
import { useProjects } from '@/contexts/ProjectContext';

export const ProjectList: React.FC = () => {
  const { projects, currentProject, selectProject, deleteProject } = useProjects();

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Mis Proyectos
        </h3>
        <p className="text-sm text-gray-500">No tienes proyectos todavía.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Mis Proyectos
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
              currentProject?.id === project.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => selectProject(project.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{project.name}</h4>
                <p className="text-xs text-gray-500">
                  {project.rows} × {project.cols} cuadros
                </p>
                <p className="text-xs text-gray-400">
                  Actualizado: {new Date(project.updatedAt).toLocaleDateString('es-ES')}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`¿Estás seguro de que quieres eliminar "${project.name}"?`)) {
                    deleteProject(project.id);
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium ml-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
