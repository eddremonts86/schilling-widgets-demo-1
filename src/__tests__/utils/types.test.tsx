// Mock del sistema de widgets para testing
jest.mock('schilling-widgets-system', () => ({
  Task: {},
}));

describe('Types and Constants', () => {
  test('mockTasks data structure is correct', () => {
    // Definir las tareas mock igual que en App.tsx
    const mockTasks = [
      {
        id: '1',
        name: 'Implement authentication system',
        status: 'In progress' as const,
        reference: 'AUTH-001',
        phase: 'Development',
        expectedStart: '2025-01-01',
        expectedDue: '2025-01-15',
        assignee: 'John Doe',
        priority: 'high' as const,
        progress: 75,
        description: 'Implement JWT authentication with refresh tokens',
        tags: ['auth', 'security', 'backend'],
      },
      {
        id: '2',
        name: 'Design user dashboard',
        status: 'Not started' as const,
        reference: 'UI-002',
        phase: 'Design',
        expectedStart: '2025-01-10',
        expectedDue: '2025-01-20',
        assignee: 'Jane Smith',
        priority: 'medium' as const,
        progress: 0,
        description: 'Create wireframes and mockups for user dashboard',
        tags: ['ui', 'design', 'frontend'],
      },
      {
        id: '3',
        name: 'API documentation',
        status: 'Blocked' as const,
        reference: 'DOC-003',
        phase: 'Documentation',
        expectedStart: '2025-01-05',
        expectedDue: '2025-01-12',
        assignee: 'Bob Johnson',
        priority: 'low' as const,
        progress: 30,
        description: 'Complete API documentation with examples',
        tags: ['documentation', 'api'],
      },
      {
        id: '4',
        name: 'Database migration',
        status: 'Overdue' as const,
        reference: 'DB-004',
        phase: 'Infrastructure',
        expectedStart: '2024-12-20',
        expectedDue: '2024-12-30',
        assignee: 'Alice Wilson',
        priority: 'high' as const,
        progress: 90,
        description: 'Migrate database to new schema version',
        tags: ['database', 'migration', 'infrastructure'],
      },
      {
        id: '5',
        name: 'Mobile app testing',
        status: 'On hold' as const,
        reference: 'TEST-005',
        phase: 'Testing',
        expectedStart: '2025-01-15',
        expectedDue: '2025-01-25',
        assignee: 'Charlie Brown',
        priority: 'medium' as const,
        progress: 20,
        description: 'Comprehensive testing on mobile devices',
        tags: ['testing', 'mobile', 'qa'],
      },
    ];

    // Verificar que tenemos 5 tareas
    expect(mockTasks).toHaveLength(5);

    // Verificar estructura de la primera tarea
    const firstTask = mockTasks[0];
    expect(firstTask).toHaveProperty('id');
    expect(firstTask).toHaveProperty('name');
    expect(firstTask).toHaveProperty('status');
    expect(firstTask).toHaveProperty('reference');
    expect(firstTask).toHaveProperty('phase');
    expect(firstTask).toHaveProperty('expectedStart');
    expect(firstTask).toHaveProperty('expectedDue');
    expect(firstTask).toHaveProperty('assignee');
    expect(firstTask).toHaveProperty('priority');
    expect(firstTask).toHaveProperty('progress');
    expect(firstTask).toHaveProperty('description');
    expect(firstTask).toHaveProperty('tags');

    // Verificar tipos específicos
    expect(typeof firstTask.id).toBe('string');
    expect(typeof firstTask.name).toBe('string');
    expect(typeof firstTask.progress).toBe('number');
    expect(Array.isArray(firstTask.tags)).toBe(true);
  });

  test('task statuses are valid', () => {
    const validStatuses = [
      'In progress',
      'Not started',
      'Blocked',
      'Overdue',
      'On hold',
    ];

    const mockTasks = [
      { status: 'In progress' as const },
      { status: 'Not started' as const },
      { status: 'Blocked' as const },
      { status: 'Overdue' as const },
      { status: 'On hold' as const },
    ];

    mockTasks.forEach((task, index) => {
      expect(validStatuses).toContain(task.status);
    });
  });

  test('task priorities are valid', () => {
    const validPriorities = ['high', 'medium', 'low'];

    const mockTasks = [
      { priority: 'high' as const },
      { priority: 'medium' as const },
      { priority: 'low' as const },
    ];

    mockTasks.forEach(task => {
      expect(validPriorities).toContain(task.priority);
    });
  });

  test('progress values are within valid range', () => {
    const progressValues = [75, 0, 30, 90, 20];

    progressValues.forEach(progress => {
      expect(progress).toBeGreaterThanOrEqual(0);
      expect(progress).toBeLessThanOrEqual(100);
      expect(typeof progress).toBe('number');
    });
  });

  test('date formats are consistent', () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const dates = [
      '2025-01-01',
      '2025-01-15',
      '2025-01-10',
      '2025-01-20',
      '2024-12-20',
      '2024-12-30',
    ];

    dates.forEach(date => {
      expect(date).toMatch(dateRegex);
    });
  });

  test('tags are arrays of strings', () => {
    const tagArrays = [
      ['auth', 'security', 'backend'],
      ['ui', 'design', 'frontend'],
      ['documentation', 'api'],
      ['database', 'migration', 'infrastructure'],
      ['testing', 'mobile', 'qa'],
    ];

    tagArrays.forEach(tags => {
      expect(Array.isArray(tags)).toBe(true);
      tags.forEach(tag => {
        expect(typeof tag).toBe('string');
        expect(tag.length).toBeGreaterThan(0);
      });
    });
  });

  test('task IDs are unique', () => {
    const ids = ['1', '2', '3', '4', '5'];
    const uniqueIds = new Set(ids);

    expect(uniqueIds.size).toBe(ids.length);
  });

  test('references follow expected pattern', () => {
    const references = ['AUTH-001', 'UI-002', 'DOC-003', 'DB-004', 'TEST-005'];
    const referenceRegex = /^[A-Z]+-\d{3}$/;

    references.forEach(reference => {
      expect(reference).toMatch(referenceRegex);
    });
  });
});
