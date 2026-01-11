import type { Metadata } from "next";
import "./globals.css";
import { ProjectProvider } from "@/contexts/ProjectContext";

export const metadata: Metadata = {
  title: "Tapiz Helper - Diseñador de Tapices de Punto de Cruz",
  description: "Aplicación web para planificar y diseñar tapices de punto de cruz. Crea proyectos con cuadrícula personalizable, pinta cada cuadro con colores predefinidos para visualizar tu diseño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
