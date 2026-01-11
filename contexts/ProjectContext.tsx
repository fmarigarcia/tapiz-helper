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
        return JSON.parse(storedProjects);
      }
    }
    return [];
  });

  const [currentProject, setCurrentProject] = useState<Project | null>(() => {
    if (typeof window !== 'undefined') {
      const storedProjects = localStorage.getItem('tapiz-projects');
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        return parsedProjects.length > 0 ? parsedProjects[0] : null;
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
      id: Date.now().toString(),
      name,
      rows,
      cols,
      grid: createEmptyGrid(rows, cols),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
