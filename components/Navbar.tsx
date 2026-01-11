'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onNewProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNewProject }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">
              🧵 Tapiz Helper
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={onNewProject}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
            >
              + Nuevo Proyecto
            </button>
            <Link
              href="/proyectos"
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors font-medium"
            >
              Mis Proyectos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
