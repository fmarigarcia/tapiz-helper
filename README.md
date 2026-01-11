# 🧵 Tapiz Helper

Aplicación web para planificar y diseñar tapices de punto de cruz.

## 📋 Descripción

Tapiz Helper es una herramienta interactiva que permite a los usuarios crear y diseñar patrones de bordado de punto de cruz. Con una interfaz intuitiva en español, puedes crear proyectos con cuadrículas personalizables y pintar cada cuadro con colores predefinidos para visualizar tu diseño antes de coser.

## ✨ Características

- ✅ **Cuadrícula Personalizable**: Crea proyectos con el tamaño de cuadrícula que necesites (hasta 100x100)
- 🎨 **Paleta de Colores**: 16 colores predefinidos para diseñar tus patrones
- 🖱️ **Pintado Interactivo**: Haz clic y arrastra para pintar múltiples celdas
- 💾 **Persistencia Local**: Todos los proyectos se guardan automáticamente en localStorage
- 📁 **Múltiples Proyectos**: Gestiona varios diseños simultáneamente
- 🧹 **Limpiar Cuadrícula**: Reinicia tu diseño cuando lo necesites
- 📱 **Diseño Responsivo**: Funciona en dispositivos móviles y de escritorio

## 🚀 Tecnologías

- **Next.js 16** - Framework de React
- **React 19** - Biblioteca de UI
- **Context API** - Gestión de estado global
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos y diseño
- **pnpm** - Gestor de paquetes

## 🛠️ Instalación

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar versión de producción
pnpm start
```

## 📖 Uso

1. **Crear un Proyecto**: Haz clic en "Nuevo Proyecto" e ingresa el nombre y dimensiones de tu cuadrícula
2. **Seleccionar Color**: Elige un color de la paleta lateral
3. **Diseñar**: Haz clic o arrastra sobre la cuadrícula para pintar
4. **Gestionar Proyectos**: Cambia entre proyectos en la lista lateral
5. **Limpiar**: Usa el botón "Limpiar Cuadrícula" para empezar de nuevo

## 💡 Casos de Uso

- Planificar patrones de bordado de punto de cruz
- Diseñar tapices y alfombras
- Crear esquemas de pixel art
- Planificar diseños de manualidades

## 📝 Estructura del Proyecto

```
tapiz-helper/
├── app/
│   ├── layout.tsx       # Layout principal con Provider
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globales
├── components/
│   ├── Grid.tsx         # Componente de cuadrícula interactiva
│   ├── ColorPicker.tsx  # Selector de colores
│   ├── ProjectList.tsx  # Lista de proyectos
│   ├── NewProjectModal.tsx  # Modal para crear proyectos
│   └── Toolbar.tsx      # Barra de herramientas
├── contexts/
│   └── ProjectContext.tsx   # Context API para estado global
└── types/
    └── index.ts         # Definiciones de tipos TypeScript
```

## 🎨 Paleta de Colores

La aplicación incluye 16 colores predefinidos:
- Blanco, Negro, Rojo, Verde, Azul, Amarillo
- Magenta, Cian, Naranja, Púrpura, Rosa
- Marrón, Gris, Oro, Plata, Marrón oscuro

## 📄 Licencia

Este proyecto es de código abierto.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.
