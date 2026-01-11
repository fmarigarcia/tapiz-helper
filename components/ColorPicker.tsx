'use client';

import React from 'react';
import { PREDEFINED_COLORS } from '@/types';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Paleta de Colores
      </h3>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PREDEFINED_COLORS.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 rounded-md border-2 transition-all hover:scale-110 ${
              selectedColor === color
                ? 'border-blue-500 ring-2 ring-blue-300'
                : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            title={color}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Color seleccionado:</span>
        <div
          className="w-8 h-8 rounded border-2 border-gray-300"
          style={{ backgroundColor: selectedColor }}
        />
        <span className="text-xs text-gray-500 font-mono">{selectedColor}</span>
      </div>
    </div>
  );
};
