import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';

// Mock del sistema de widgets para evitar dependencias externas
jest.mock('schilling-widgets-system', () => ({
  SchillingWidgets: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='schilling-widgets'>{children}</div>
  ),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='theme-provider'>{children}</div>
  ),
  TaskManager: ({
    tasks,
    onTaskUpdate,
    onTaskDelete,
    onRefresh,
    loading,
  }: any) => (
    <div data-testid='task-manager'>
      <div data-testid='task-count'>{tasks.length} tasks</div>
      <button
        data-testid='task-update-btn'
        onClick={() => onTaskUpdate('1', { name: 'Updated Task' })}
      >
        Update Task
      </button>
      <button data-testid='task-delete-btn' onClick={() => onTaskDelete('1')}>
        Delete Task
      </button>
      <button data-testid='task-refresh-btn' onClick={onRefresh}>
        Refresh
      </button>
      {loading && <div data-testid='loading'>Loading...</div>}
    </div>
  ),
  Button: ({ children, onClick, variant }: any) => (
    <button data-testid={`button-${variant}`} onClick={onClick}>
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='card'>{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='card-header'>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid='card-title'>{children}</h3>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='card-content'>{children}</div>
  ),
  Input: ({ placeholder, style }: any) => (
    <input data-testid='input' placeholder={placeholder} style={style} />
  ),
}));

// Mock console.log para verificar que se llama
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock setTimeout para controlar los timers
jest.useFakeTimers();

describe('App Component', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    jest.useRealTimers();
  });

  test('renders main components', () => {
    render(<App />);

    // Verificar que los componentes principales se renderizan
    expect(screen.getByTestId('schilling-widgets')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(
      screen.getByText('Schilling Widgets System Demo')
    ).toBeInTheDocument();
    expect(
      screen.getByText('TaskManager Widget Demonstration')
    ).toBeInTheDocument();
    expect(screen.getByTestId('task-manager')).toBeInTheDocument();
  });

  test('displays correct initial task count', () => {
    render(<App />);

    // Verificar que se muestran 5 tareas iniciales (mockTasks)
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');
  });

  test('shows/hides SimpleDemo when toggle button is clicked', async () => {
    render(<App />);

    const toggleButton = screen.getByText('Show Test');

    // Inicialmente SimpleDemo no debe estar visible
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();

    // Hacer clic para mostrar SimpleDemo
    await userEvent.click(toggleButton);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Hide Test')).toBeInTheDocument();

    // Hacer clic para ocultar SimpleDemo
    await userEvent.click(screen.getByText('Hide Test'));

    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
    expect(screen.getByText('Show Test')).toBeInTheDocument();
  });

  test('calls handleTaskUpdate with correct parameters', async () => {
    render(<App />);

    const updateButton = screen.getByTestId('task-update-btn');
    await userEvent.click(updateButton);

    expect(mockConsoleLog).toHaveBeenCalledWith('Task updated:', '1', {
      name: 'Updated Task',
    });
  });

  test('calls handleTaskDelete and updates task count', async () => {
    render(<App />);

    const deleteButton = screen.getByTestId('task-delete-btn');
    
    // Verificar task count inicial
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');

    await userEvent.click(deleteButton);

    // Verificar que console.log fue llamado
    expect(mockConsoleLog).toHaveBeenCalledWith('Task deleted:', '1');
    
    // Verificar que el task count cambió
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');
  });

  test('toggle button text changes correctly', async () => {
    render(<App />);

    // Estado inicial
    const button = screen.getByRole('button', { name: /show test|hide test/i });
    expect(button).toHaveTextContent('Show Test');

    // Después del clic
    await userEvent.click(button);
    expect(button).toHaveTextContent('Hide Test');

    // Después del segundo clic
    await userEvent.click(button);
    expect(button).toHaveTextContent('Show Test');
  });

  test('handles task update correctly', async () => {
    render(<App />);

    const updateButton = screen.getByTestId('task-update-btn');

    await userEvent.click(updateButton);

    // Verificar que console.log fue llamado con los parámetros correctos
    expect(mockConsoleLog).toHaveBeenCalledWith('Task updated:', '1', {
      name: 'Updated Task',
    });
  });

  test('handles task deletion correctly', async () => {
    render(<App />);

    const deleteButton = screen.getByTestId('task-delete-btn');

    // Verificar task count inicial
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');

    await userEvent.click(deleteButton);

    // Verificar que la tarea fue eliminada
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');

    // Verificar que console.log fue llamado
    expect(mockConsoleLog).toHaveBeenCalledWith('Task deleted:', '1');
  });

  test('handles refresh functionality correctly', async () => {
    render(<App />);

    const refreshButton = screen.getByTestId('task-refresh-btn');

    await userEvent.click(refreshButton);

    // Verificar que aparece el loading
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Avanzar el timer para completar el refresh
    jest.advanceTimersByTime(1000);

    // Verificar que el loading desaparece
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Verificar que console.log fue llamado
    expect(mockConsoleLog).toHaveBeenCalledWith('Data refreshed');
  });

  test('handles refresh button in demo controls', async () => {
    render(<App />);

    const demoRefreshButton = screen.getByText('Refresh Data');

    await userEvent.click(demoRefreshButton);

    // Verificar que el botón cambia a "Refreshing..."
    expect(screen.getByText('Refreshing...')).toBeInTheDocument();
    expect(screen.getByText('Refreshing...')).toBeDisabled();

    // Avanzar el timer
    jest.advanceTimersByTime(1000);

    // Verificar que vuelve al estado normal
    await waitFor(() => {
      expect(screen.getByText('Refresh Data')).toBeInTheDocument();
      expect(screen.getByText('Refresh Data')).not.toBeDisabled();
    });
  });

  test('displays demo information correctly', () => {
    render(<App />);

    expect(screen.getByText('Demo Information')).toBeInTheDocument();
    expect(
      screen.getByText(
        /This demo shows the TaskManager widget with 5 sample tasks/
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Features demonstrated:')).toBeInTheDocument();
    expect(screen.getByText('Task viewing and editing')).toBeInTheDocument();
    expect(screen.getByText('Status management')).toBeInTheDocument();
    expect(screen.getByText('Progress tracking')).toBeInTheDocument();
    expect(screen.getByText('Priority indicators')).toBeInTheDocument();
    expect(screen.getByText('Tag system')).toBeInTheDocument();
    expect(screen.getByText('Real-time updates')).toBeInTheDocument();
  });

  test('passes correct props to TaskManager', () => {
    render(<App />);

    const taskManager = screen.getByTestId('task-manager');
    expect(taskManager).toBeInTheDocument();

    // Verificar que todos los botones del TaskManager están presentes
    expect(screen.getByTestId('task-update-btn')).toBeInTheDocument();
    expect(screen.getByTestId('task-delete-btn')).toBeInTheDocument();
    expect(screen.getByTestId('task-refresh-btn')).toBeInTheDocument();
  });

  test('has correct CSS classes', () => {
    render(<App />);

    const app = screen
      .getByText('Schilling Widgets System Demo')
      .closest('.App');
    expect(app).toHaveClass('App');

    const header = screen
      .getByText('Schilling Widgets System Demo')
      .closest('.App-header');
    expect(header).toHaveClass('App-header');

    const main = screen
      .getByText('Task Management Dashboard')
      .closest('.App-main');
    expect(main).toHaveClass('App-main');
  });

  test('multiple task operations work correctly', async () => {
    render(<App />);

    // Verificar task count inicial
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');

    // Eliminar una tarea
    await userEvent.click(screen.getByTestId('task-delete-btn'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');

    // Actualizar una tarea
    await userEvent.click(screen.getByTestId('task-update-btn'));
    expect(mockConsoleLog).toHaveBeenCalledWith('Task updated:', '1', {
      name: 'Updated Task',
    });

    // El count debería seguir siendo 4 después de la actualización
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');
  });
});
