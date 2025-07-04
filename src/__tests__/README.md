# Tests Organization

Esta carpeta contiene todos los tests del proyecto organizados por categorías.

## 📁 Estructura de Carpetas

```
src/__tests__/
├── components/          # Tests de componentes React
│   ├── App.test.tsx     # Tests del componente principal App
│   └── SimpleDemo.test.tsx # Tests del componente SimpleDemo
├── integration/         # Tests de integración
│   └── integration.test.tsx # Tests de flujo completo de usuario
└── utils/              # Tests de utilidades y funciones
    ├── index.test.tsx  # Tests del punto de entrada
    └── types.test.tsx  # Tests de tipos y estructuras de datos
```

## 🧪 Tipos de Tests

### Components Tests (`/components/`)

- **App.test.tsx**: Tests unitarios del componente principal

  - Renderizado de componentes
  - Manejo de estado (tasks, loading, showTest)
  - Funciones de callback (update, delete, refresh)
  - Interacciones de usuario
  - Props y configuraciones

- **SimpleDemo.test.tsx**: Tests del componente de demostración
  - Renderizado de widgets básicos
  - Estilos y layout
  - Estructura de componentes

### Integration Tests (`/integration/`)

- **integration.test.tsx**: Tests de integración completos
  - Flujo completo de usuario
  - Interacción entre componentes
  - Estados de la aplicación
  - Configuraciones de providers
  - Accesibilidad y estructura semántica

### Utils Tests (`/utils/`)

- **index.test.tsx**: Tests del punto de entrada de la aplicación

  - Inicialización de React
  - Configuración de ReactDOM
  - Manejo de errores de setup

- **types.test.tsx**: Tests de tipos y estructuras de datos
  - Validación de estructuras de tareas
  - Tipos de estado válidos
  - Formatos de datos consistentes

## 📊 Cobertura de Tests

Todos los tests están configurados para mantener **100% de cobertura**:

- ✅ 100% Statements
- ✅ 100% Branches
- ✅ 100% Functions
- ✅ 100% Lines

## 🔧 Configuración

### Jest Config

- Configuración en `jest.config.json`
- Setup en `src/setupTests.ts`
- Umbrales de cobertura obligatorios

### Mocking

- Sistema de widgets Schilling mockeado
- APIs del navegador mockeadas
- Timers y async operations controladas

## 🚀 Comandos

```bash
# Ejecutar todos los tests
npm test

# Ejecutar con cobertura
npm test -- --coverage

# Ejecutar tests específicos
npm test -- --testPathPattern=components
npm test -- --testPathPattern=integration
npm test -- --testPathPattern=utils

# Modo watch
npm test -- --watch

# Verbose mode
npm test -- --verbose
```

## 🎯 Mejores Prácticas

1. **Aislamiento**: Cada test es independiente
2. **Mocking**: Dependencias externas mockeadas
3. **Cleanup**: Limpieza adecuada de timers y mocks
4. **Assertions**: Verificaciones específicas y precisas
5. **Organizacion**: Tests agrupados por funcionalidad
6. **Cobertura**: 100% de cobertura mantenida
7. **Accesibilidad**: Tests de a11y incluidos
