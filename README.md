# Schilling Widgets Demo

This is a comprehensive demo project showcasing the **schilling-widgets-system** library with React + TypeScript + Vite.

## Features

This demo includes examples of:

-   **Basic Components**: Buttons, Input fields, Cards, Badges
-   **Task Manager Widget**: Advanced task management with inline editing, filtering, and virtualization
-   **Advanced Components**: Tabs, Accordion, and more
-   **Theme Support**: Light/dark mode theming
-   **TypeScript Integration**: Full TypeScript support

## Getting Started

### Prerequisites

-   Node.js (version 18 or higher)
-   npm or yarn

### Installation

1. Clone this repository or download the source code
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to see the demo.

### Build

Create a production build:

```bash
npm run build
```

## About Schilling Widgets

The `schilling-widgets-system` is a complete UI components library for React applications featuring:

-   Complete component library (Button, Card, Input, etc.)
-   Advanced widgets (TaskManager, InfiniteTable)
-   TypeScript-first development
-   Flexible theming (light/dark mode)
-   TanStack Query integration
-   Works with or without Tailwind CSS

## Project Structure

```text
src/
  ├── App.tsx          # Main demo application
  ├── main.tsx         # Application entry point
  └── index.css        # Global styles and theme variables
```

## Dependencies

-   **React 19** - Latest React with concurrent features
-   **TypeScript** - Type-safe development
-   **Vite** - Fast build tool and dev server
-   **schilling-widgets-system** - Complete UI library

## License

This demo project is for demonstration purposes.
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
