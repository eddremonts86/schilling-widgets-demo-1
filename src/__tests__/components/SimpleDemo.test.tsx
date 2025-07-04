import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SimpleDemo from '../../SimpleDemo';

// Mock del sistema de widgets
jest.mock('schilling-widgets-system', () => ({
  Button: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) => <button data-testid={`button-${variant}`}>{children}</button>,
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
  Input: ({
    placeholder,
    style,
  }: {
    placeholder: string;
    style: React.CSSProperties;
  }) => <input data-testid='input' placeholder={placeholder} style={style} />,
}));

describe('SimpleDemo Component', () => {
  test('renders all components correctly', () => {
    render(<SimpleDemo />);

    // Verificar que el card se renderiza
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
  });

  test('displays correct title', () => {
    render(<SimpleDemo />);

    expect(screen.getByTestId('card-title')).toBeInTheDocument();
    expect(screen.getByText('Simple Components Demo')).toBeInTheDocument();
  });

  test('renders all button variants', () => {
    render(<SimpleDemo />);

    expect(screen.getByTestId('button-default')).toBeInTheDocument();
    expect(screen.getByTestId('button-secondary')).toBeInTheDocument();
    expect(screen.getByTestId('button-outline')).toBeInTheDocument();

    expect(screen.getByText('Default Button')).toBeInTheDocument();
    expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    expect(screen.getByText('Outline Button')).toBeInTheDocument();
  });

  test('renders input with correct placeholder', () => {
    render(<SimpleDemo />);

    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter some text...');
  });

  test('has correct container styling', () => {
    render(<SimpleDemo />);

    // Encontrar el div contenedor por su estilo
    const container = screen.getByTestId('card').parentElement;
    expect(container).toHaveStyle({
      padding: '20px',
      marginBottom: '20px',
    });
  });

  test('has correct content layout styling', () => {
    render(<SimpleDemo />);

    const cardContent = screen.getByTestId('card-content');
    const flexContainer = cardContent.firstElementChild;

    expect(flexContainer).toHaveStyle({
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      alignItems: 'center',
    });
  });

  test('input has correct styling', () => {
    render(<SimpleDemo />);

    const input = screen.getByTestId('input');
    expect(input).toHaveStyle({
      minWidth: '200px',
    });
  });

  test('component structure is correct', () => {
    render(<SimpleDemo />);

    // Verificar la jerarquía de componentes
    const card = screen.getByTestId('card');
    const cardHeader = screen.getByTestId('card-header');
    const cardContent = screen.getByTestId('card-content');

    expect(card).toContainElement(cardHeader);
    expect(card).toContainElement(cardContent);
    expect(cardHeader).toContainElement(screen.getByTestId('card-title'));
  });

  test('all interactive elements are present', () => {
    render(<SimpleDemo />);

    // Verificar que todos los elementos interactivos están presentes
    const buttons = screen.getAllByRole('button');
    const input = screen.getByRole('textbox');

    expect(buttons).toHaveLength(3);
    expect(input).toBeInTheDocument();
  });
});
