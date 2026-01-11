'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProjects } from '@/contexts/ProjectContext';
import { Navbar } from '@/components/Navbar';
import { NewProjectModal } from '@/components/NewProjectModal';

export default function ProyectosPage() {
  const router = useRouter();
  const { projects, currentProject, selectProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectProject = (id: string) => {
    selectProject(id);
    router.push('/');
  };

  const handleDeleteProject = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de que quieres eliminar "${name}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar onNewProject={() => setIsModalOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Mis Proyectos</h2>
          <p className="text-gray-600">
            Selecciona un proyecto para editarlo o crea uno nuevo
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">🧵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No tienes proyectos todavía
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primer proyecto para empezar a diseñar patrones de bordado
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              + Crear Primer Proyecto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleSelectProject(project.id)}
                className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all hover:shadow-xl hover:scale-105 ${
                  currentProject?.id === project.id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {project.name}
                    </h3>
                    {currentProject?.id === project.id && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-500 text-white rounded">
                        Actual
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(project.id, project.name, e)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                    title="Eliminar proyecto"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                      />
                    </svg>
                    <span className="font-medium">
                      {project.rows} × {project.cols} cuadros
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      Creado: {new Date(project.createdAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Actualizado: {new Date(project.updatedAt).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <footer className="bg-white shadow-md mt-12">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 text-sm">
          <p>
            Tapiz Helper - Herramienta para planificar patrones de bordado y tapicería
          </p>
        </div>
      </footer>
    </div>
  );
}
