'use client';

import { useState } from 'react';
import { Grid } from '@/components/Grid';
import { ColorPicker } from '@/components/ColorPicker';
import { ProjectList } from '@/components/ProjectList';
import { NewProjectModal } from '@/components/NewProjectModal';
import { Toolbar } from '@/components/Toolbar';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🧵 Tapiz Helper
          </h1>
          <p className="text-gray-600 mt-1">
            Diseñador de patrones de punto de cruz
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Toolbar onNewProject={() => setIsModalOpen(true)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Grid selectedColor={selectedColor} />
          </div>

          <div className="space-y-6">
            <ColorPicker
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
            <ProjectList />
          </div>
        </div>
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
