'use client';

import React, { useState } from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addProject } = useProjects();
  const [name, setName] = useState('');
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addProject(name.trim(), rows, cols);
      setName('');
      setRows(20);
      setCols(20);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Nuevo Proyecto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del Proyecto
            </label>
            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Mi tapiz"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rows"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de Filas
            </label>
            <input
              id="rows"
              type="number"
              value={rows}
              onChange={(e) => setRows(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              min="1"
              max="100"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="cols"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número de Columnas
            </label>
            <input
              id="cols"
              type="number"
              value={cols}
              onChange={(e) => setCols(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              min="1"
              max="100"
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
