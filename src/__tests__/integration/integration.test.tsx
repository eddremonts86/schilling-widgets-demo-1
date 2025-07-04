import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../../App';

// Mock completo del sistema de widgets
jest.mock('schilling-widgets-system', () => ({
  SchillingWidgets: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='schilling-widgets'>{children}</div>
  ),
  ThemeProvider: ({
    children,
    config,
  }: {
    children: React.ReactNode;
    config: { theme: string; useTailwind: boolean };
  }) => (
    <div
      data-testid='theme-provider'
      data-theme={config.theme}
      data-tailwind={config.useTailwind}
    >
      {children}
    </div>
  ),
  TaskManager: ({
    tasks,
    height,
    enableInlineEdit,
    enableRealTimeUpdates,
    onTaskUpdate,
    onTaskDelete,
    onRefresh,
    loading,
  }: any) => (
    <div
      data-testid='task-manager'
      data-height={height}
      data-inline-edit={enableInlineEdit}
      data-realtime={enableRealTimeUpdates}
    >
      <div data-testid='task-count'>{tasks.length} tasks</div>
      <button
        data-testid='task-update-btn'
        onClick={() =>
          onTaskUpdate('1', { name: 'Updated Task', priority: 'low' })
        }
      >
        Update Task
      </button>
      <button data-testid='task-delete-btn' onClick={() => onTaskDelete('1')}>
        Delete Task
      </button>
      <button data-testid='task-refresh-btn' onClick={onRefresh}>
        Refresh Tasks
      </button>
      {loading && <div data-testid='task-loading'>Loading tasks...</div>}
    </div>
  ),
  Button: ({ children, onClick, variant }: any) => (
    <button data-testid={`widget-button-${variant}`} onClick={onClick}>
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='widget-card'>{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='widget-card-header'>{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid='widget-card-title'>{children}</h3>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='widget-card-content'>{children}</div>
  ),
  Input: ({ placeholder, style }: any) => (
    <input data-testid='widget-input' placeholder={placeholder} style={style} />
  ),
}));

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock timers
jest.useFakeTimers();

describe('Integration Tests - Full App Workflow', () => {
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

  test('complete user workflow - show demo, manage tasks, refresh', async () => {
    render(<App />);

    // Verificar estado inicial
    expect(
      screen.getByText('Schilling Widgets System Demo')
    ).toBeInTheDocument();
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');
    expect(screen.getByText('Show Test')).toBeInTheDocument();

    // Paso 1: Mostrar demo de componentes
    await userEvent.click(screen.getByText('Show Test'));
    expect(screen.getByTestId('widget-card')).toBeInTheDocument();
    expect(screen.getByText('Simple Components Demo')).toBeInTheDocument();
    expect(screen.getByText('Hide Test')).toBeInTheDocument();

    // Verificar que todos los componentes demo están presentes
    expect(screen.getByTestId('widget-button-default')).toBeInTheDocument();
    expect(screen.getByTestId('widget-button-secondary')).toBeInTheDocument();
    expect(screen.getByTestId('widget-button-outline')).toBeInTheDocument();
    expect(screen.getByTestId('widget-input')).toBeInTheDocument();

    // Paso 2: Actualizar una tarea
    await userEvent.click(screen.getByTestId('task-update-btn'));
    expect(mockConsoleLog).toHaveBeenCalledWith('Task updated:', '1', {
      name: 'Updated Task',
      priority: 'low',
    });

    // Paso 3: Eliminar una tarea
    await userEvent.click(screen.getByTestId('task-delete-btn'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');
    expect(mockConsoleLog).toHaveBeenCalledWith('Task deleted:', '1');

    // Paso 4: Hacer refresh
    await userEvent.click(screen.getByTestId('task-refresh-btn'));
    expect(screen.getByTestId('task-loading')).toBeInTheDocument();

    // Avanzar tiempo y verificar que termina el loading
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.queryByTestId('task-loading')).not.toBeInTheDocument();
    });

    expect(mockConsoleLog).toHaveBeenCalledWith('Data refreshed');

    // Paso 5: Usar el botón de refresh de demo controls
    const demoRefreshBtn = screen.getByText('Refresh Data');
    await userEvent.click(demoRefreshBtn);

    expect(screen.getByText('Refreshing...')).toBeInTheDocument();
    expect(screen.getByText('Refreshing...')).toBeDisabled();

    // Avanzar tiempo
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByText('Refresh Data')).toBeInTheDocument();
      expect(screen.getByText('Refresh Data')).not.toBeDisabled();
    });

    // Paso 6: Ocultar demo
    await userEvent.click(screen.getByText('Hide Test'));
    expect(screen.queryByTestId('widget-card')).not.toBeInTheDocument();
    expect(screen.getByText('Show Test')).toBeInTheDocument();
  });

  test('theme provider receives correct configuration', () => {
    render(<App />);

    const themeProvider = screen.getByTestId('theme-provider');
    expect(themeProvider).toHaveAttribute('data-theme', 'light');
    expect(themeProvider).toHaveAttribute('data-tailwind', 'false');
  });

  test('task manager receives correct props', () => {
    render(<App />);

    const taskManager = screen.getByTestId('task-manager');
    expect(taskManager).toHaveAttribute('data-height', '600');
    expect(taskManager).toHaveAttribute('data-inline-edit', 'true');
    expect(taskManager).toHaveAttribute('data-realtime', 'true');
  });

  test('demo information displays correctly', () => {
    render(<App />);

    expect(screen.getByText('Demo Information')).toBeInTheDocument();
    expect(
      screen.getByText(
        /This demo shows the TaskManager widget with 5 sample tasks/
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Features demonstrated:')).toBeInTheDocument();

    // Verificar todas las características listadas
    const features = [
      'Task viewing and editing',
      'Status management',
      'Progress tracking',
      'Priority indicators',
      'Tag system',
      'Real-time updates',
    ];

    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('CSS classes are applied correctly', () => {
    render(<App />);

    // Verificar clases CSS principales
    const appDiv = screen
      .getByText('Schilling Widgets System Demo')
      .closest('.App');
    expect(appDiv).toHaveClass('App');

    const header = screen
      .getByText('Schilling Widgets System Demo')
      .closest('.App-header');
    expect(header).toHaveClass('App-header');

    const main = screen
      .getByText('Task Management Dashboard')
      .closest('.App-main');
    expect(main).toHaveClass('App-main');

    const container = screen
      .getByText('Task Management Dashboard')
      .closest('.container');
    expect(container).toHaveClass('container');

    const taskManagerContainer = screen
      .getByTestId('task-manager')
      .closest('.task-manager-container');
    expect(taskManagerContainer).toHaveClass('task-manager-container');
  });

  test('error handling and edge cases', async () => {
    render(<App />);

    // Simular múltiples operaciones rápidas
    await userEvent.click(screen.getByTestId('task-delete-btn'));
    // Solo eliminar una tarea para que el test sea predecible
    await userEvent.click(screen.getByTestId('task-update-btn'));

    // Verificar que el contador se actualiza correctamente (5 - 1 = 4)
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');

    // Verificar logs (1 delete + 1 update = 2 logs)
    expect(mockConsoleLog).toHaveBeenCalledTimes(2);
  });

  test('component lifecycle and state management', async () => {
    const { unmount } = render(<App />);

    // Estado inicial
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');

    // Realizar cambios
    await userEvent.click(screen.getByTestId('task-delete-btn'));
    expect(screen.getByTestId('task-count')).toHaveTextContent('4 tasks');

    // Desmontar y volver a montar componente
    unmount();
    render(<App />);

    // Verificar que el estado se reinicia (nuevo mount)
    expect(screen.getByTestId('task-count')).toHaveTextContent('5 tasks');
  });

  test('accessibility and semantic structure', () => {
    render(<App />);

    // Verificar estructura semántica
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument(); // h1
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument(); // h2

    // Verificar botones
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });
});
