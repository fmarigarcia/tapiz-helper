'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, Cell } from '@/types';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  addProject: (name: string, rows: number, cols: number) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string) => void;
  updateCell: (row: number, col: number, color: string) => void;
  clearGrid: () => void;
  setSelectedLine: (line: number | null) => void;
  addColorToPalette: (color: string) => void;
  removeColorFromPalette: (color: string) => void;
  exportProject: (projectId: string) => void;
  importProject: (jsonData: string) => boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  // Load projects from localStorage during initialization
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('tapiz-projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects) as Project[];
        // Migrate old projects without selectedLine and palette
        return parsed.map((p) => ({
          ...p,
          selectedLine: p.selectedLine ?? null,
          palette: p.palette ?? ['#FFFFFF', '#000000'], // Default: white and black
        }));
      }
    }
    return [];
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('tapiz-projects');
      if (storedProjects) {
        const parsed = JSON.parse(storedProjects) as Project[];
        // Migrate old projects without selectedLine and palette
        const migrated = parsed.map((p) => ({
          ...p,
          selectedLine: p.selectedLine ?? null,
          palette: p.palette ?? ['#FFFFFF', '#000000'], // Default: white and black
        }));
        return migrated.length > 0 ? migrated[0] : null;
      }
    }
    return null;
  });

  // Save projects to localStorage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('tapiz-projects', JSON.stringify(projects));
    }
  }, [projects]);

  const createEmptyGrid = (rows: number, cols: number): Cell[][] => {
    return Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({ color: '#FFFFFF' }))
    );
  };

  const addProject = (name: string, rows: number, cols: number) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      rows,
      cols,
      grid: createEmptyGrid(rows, cols),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      selectedLine: null,
      palette: ['#FFFFFF', '#000000'], // Default: white and black
    };
    setProjects(prev => [...prev, newProject]);
    setCurrentProject(newProject);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => {
      const updated = prev.filter(p => p.id !== id);
      if (currentProject?.id === id) {
        setCurrentProject(updated.length > 0 ? updated[0] : null);
      }
      if (updated.length === 0) {
        localStorage.removeItem('tapiz-projects');
      }
      return updated;
    });
  };

  const selectProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setCurrentProject(project);
    }
  };

  const updateCell = (row: number, col: number, color: string) => {
    if (!currentProject) return;

    const updatedGrid = currentProject.grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? { color } : cell
      )
    );

    const updatedProject: Project = {
      ...currentProject,
      grid: updatedGrid,
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(updatedProject);
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? updatedProject : p))
    );
  };

  const clearGrid = () => {
    if (!currentProject) return;

    const clearedProject: Project = {
      ...currentProject,
      grid: createEmptyGrid(currentProject.rows, currentProject.cols),
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(clearedProject);
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? clearedProject : p))
    );
  };

  const setSelectedLine = (line: number | null) => {
    if (!currentProject) return;

    const updatedProject: Project = {
      ...currentProject,
      selectedLine: line,
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(updatedProject);
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? updatedProject : p))
    );
  };

  const addColorToPalette = (color: string) => {
    if (!currentProject) return;
    
    // Normalize color to uppercase
    const normalizedColor = color.toUpperCase();
    
    // Check if color already exists
    if (currentProject.palette?.includes(normalizedColor)) {
      return;
    }

    const updatedProject: Project = {
      ...currentProject,
      palette: [...(currentProject.palette || []), normalizedColor],
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(updatedProject);
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? updatedProject : p))
    );
  };

  const removeColorFromPalette = (color: string) => {
    if (!currentProject) return;

    // Prevent removing white and black (base colors)
    if (color.toUpperCase() === '#FFFFFF' || color.toUpperCase() === '#000000') {
      return;
    }

    const updatedProject: Project = {
      ...currentProject,
      palette: (currentProject.palette || []).filter(c => c !== color),
      updatedAt: new Date().toISOString(),
    };

    setCurrentProject(updatedProject);
    setProjects(prev =>
      prev.map(p => (p.id === currentProject.id ? updatedProject : p))
    );
  };

  const exportProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const jsonData = JSON.stringify(project, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importProject = (jsonData: string): boolean => {
    try {
      const importedProject = JSON.parse(jsonData) as Project;
      
      // Validate required fields
      if (!importedProject.name || !importedProject.rows || !importedProject.cols || !importedProject.grid) {
        alert('El archivo JSON no contiene un proyecto válido.');
        return false;
      }

      // Generate new ID and timestamps for imported project
      const newProject: Project = {
        ...importedProject,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        palette: importedProject.palette || ['#FFFFFF', '#000000'],
        selectedLine: importedProject.selectedLine ?? null,
      };

      setProjects(prev => [...prev, newProject]);
      setCurrentProject(newProject);
      return true;
    } catch {
      // Error parameter intentionally omitted as it's not used
      alert('Error al importar el proyecto. Asegúrate de que el archivo JSON sea válido.');
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        addProject,
        deleteProject,
        selectProject,
        updateCell,
        clearGrid,
        setSelectedLine,
        addColorToPalette,
        removeColorFromPalette,
        exportProject,
        importProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
