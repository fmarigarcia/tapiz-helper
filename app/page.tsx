'use client';

import { useState } from 'react';
import { Grid } from '@/components/Grid';
import { ColorPicker } from '@/components/ColorPicker';
import { NewProjectModal } from '@/components/NewProjectModal';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { RowSelector } from '@/components/RowSelector';
import { useProjects } from '@/contexts/ProjectContext';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentProject, clearGrid, exportProject } = useProjects();

  const handleClearGrid = () => {
    if (currentProject && confirm('¿Estás seguro de que quieres limpiar la cuadrícula?')) {
      clearGrid();
    }
  };

  const handleExportProject = () => {
    if (currentProject) {
      exportProject(currentProject.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Navbar onNewProject={() => setIsModalOpen(true)} />

      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)}>
        <div className="space-y-6">
          <ColorPicker
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
          />
          {currentProject && (
            <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
              <button
                onClick={handleExportProject}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Exportar a JSON
              </button>
              <button
                onClick={handleClearGrid}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                Limpiar Cuadrícula
              </button>
            </div>
          )}
        </div>
      </Sidebar>

      <main className="flex-1 flex items-center justify-center overflow-hidden p-4">
        {currentProject ? (
          <div className="w-full h-full flex items-center justify-center">
            <Grid selectedColor={selectedColor} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center max-w-md">
            <div className="text-6xl mb-4">🧵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenido a Tapiz Helper
            </h2>
            <p className="text-gray-600 mb-6">
              Crea un nuevo proyecto o selecciona uno existente para empezar a diseñar patrones de bordado
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              + Crear Proyecto
            </button>
          </div>
        )}
      </main>

      <RowSelector />

      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
