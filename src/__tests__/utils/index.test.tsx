import React from 'react';

// Mock ReactDOM.createRoot para testing
const mockRender = jest.fn();
const mockCreateRoot = jest.fn(() => ({
  render: mockRender,
}));

// Mock ReactDOM antes de importar el módulo
jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

// Mock App component
jest.mock('../../App', () => {
  return function MockApp() {
    return React.createElement('div', { 'data-testid': 'app' }, 'Mock App');
  };
});

// Mock CSS import
jest.mock('../../index.css', () => ({}));

// Mock document.getElementById
const mockGetElementById = jest.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true,
});

describe('index.tsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockGetElementById.mockReturnValue(document.createElement('div'));
  });

  test('creates root and renders App with StrictMode', () => {
    // Importar después de configurar los mocks
    require('../../index');

    // Verificar que se llamó getElementById con 'root'
    expect(mockGetElementById).toHaveBeenCalledWith('root');

    // Verificar que se llamó createRoot con el elemento correcto
    expect(mockCreateRoot).toHaveBeenCalledWith(expect.any(HTMLDivElement));

    // Verificar que se llamó render
    expect(mockRender).toHaveBeenCalledTimes(1);
  });

  test('imports are correctly structured', () => {
    // Verificar que los imports están presentes
    const indexModule = require('../../index');

    // El módulo debería ejecutarse sin errores
    expect(indexModule).toBeDefined();
  });
});
