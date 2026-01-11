'use client';

import React, { useState, useRef } from 'react';
import { useProjects } from '@/contexts/ProjectContext';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  const { currentProject, addColorToPalette, removeColorFromPalette } = useProjects();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [colorToDelete, setColorToDelete] = useState<string | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const palette = currentProject?.palette || ['#FFFFFF', '#000000'];

  const handleAddColor = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value.toUpperCase();
    addColorToPalette(newColor);
    onColorSelect(newColor);
  };

  const handleLongPressStart = (color: string) => {
    // Don't allow deletion of white and black
    if (color.toUpperCase() === '#FFFFFF' || color.toUpperCase() === '#000000') {
      return;
    }

    const timer = setTimeout(() => {
      setColorToDelete(color);
      setIsDeleteModalOpen(true);
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleDeleteColor = () => {
    if (colorToDelete) {
      removeColorFromPalette(colorToDelete);
      if (selectedColor === colorToDelete) {
        onColorSelect('#FFFFFF');
      }
    }
    setIsDeleteModalOpen(false);
    setColorToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setColorToDelete(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Paleta de Colores
        </h3>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {palette.map((color) => (
            <button
              key={color}
              className={`w-12 h-12 rounded-md border-2 transition-all hover:scale-110 ${
                selectedColor === color
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              onMouseDown={() => handleLongPressStart(color)}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={() => handleLongPressStart(color)}
              onTouchEnd={handleLongPressEnd}
              title={color}
            />
          ))}
          {/* Add color button */}
          <button
            onClick={handleAddColor}
            className="w-12 h-12 rounded-md border-2 border-dashed border-gray-400 hover:border-blue-500 hover:bg-blue-50 transition-all hover:scale-110 flex items-center justify-center"
            title="Añadir color personalizado"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <input
            ref={colorInputRef}
            type="color"
            onChange={handleColorInputChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Color seleccionado:</span>
          <div
            className="w-8 h-8 rounded border-2 border-gray-300"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-xs text-gray-500 font-mono">{selectedColor}</span>
        </div>
        <p className="text-xs text-gray-500 mt-3 italic">
          Mantén pulsado un color para eliminarlo de la paleta
        </p>
      </div>

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              ¿Eliminar este color de la paleta?
            </h3>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded border-2 border-gray-300"
                style={{ backgroundColor: colorToDelete || '#FFFFFF' }}
              />
              <span className="text-sm text-gray-600 font-mono">
                {colorToDelete}
              </span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancelDelete}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteColor}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
