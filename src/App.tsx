import { useCallback, useState } from "react";
import {
    SchillingWidgets,
    Task,
    TaskManager,
    ThemeProvider,
} from "schilling-widgets-system";
import "./App.css";
import SimpleDemo from "./SimpleDemo";

// Mock data for demonstration with proper Task type
const mockTasks: Task[] = [
    {
        id: "1",
        name: "Implement authentication system",
        status: "In progress" as const,
        reference: "AUTH-001",
        phase: "Development",
        expectedStart: "2025-01-01",
        expectedDue: "2025-01-15",
        assignee: "John Doe",
        priority: "high" as const,
        progress: 75,
        description: "Implement JWT authentication with refresh tokens",
        tags: ["auth", "security", "backend"],
    },
    {
        id: "2",
        name: "Design user dashboard",
        status: "Not started" as const,
        reference: "UI-002",
        phase: "Design",
        expectedStart: "2025-01-10",
        expectedDue: "2025-01-20",
        assignee: "Jane Smith",
        priority: "medium" as const,
        progress: 0,
        description: "Create wireframes and mockups for user dashboard",
        tags: ["ui", "design", "frontend"],
    },
    {
        id: "3",
        name: "API documentation",
        status: "Blocked" as const,
        reference: "DOC-003",
        phase: "Documentation",
        expectedStart: "2025-01-05",
        expectedDue: "2025-01-12",
        assignee: "Bob Johnson",
        priority: "low" as const,
        progress: 30,
        description: "Complete API documentation with examples",
        tags: ["documentation", "api"],
    },
    {
        id: "4",
        name: "Database migration",
        status: "Overdue" as const,
        reference: "DB-004",
        phase: "Infrastructure",
        expectedStart: "2024-12-20",
        expectedDue: "2024-12-30",
        assignee: "Alice Wilson",
        priority: "high" as const,
        progress: 90,
        description: "Migrate database to new schema version",
        tags: ["database", "migration", "infrastructure"],
    },
    {
        id: "5",
        name: "Mobile app testing",
        status: "On hold" as const,
        reference: "TEST-005",
        phase: "Testing",
        expectedStart: "2025-01-15",
        expectedDue: "2025-01-25",
        assignee: "Charlie Brown",
        priority: "medium" as const,
        progress: 20,
        description: "Comprehensive testing on mobile devices",
        tags: ["testing", "mobile", "qa"],
    },
];

function App() {
    const [tasks, setTasks] = useState(mockTasks);
    const [isLoading, setIsLoading] = useState(false);
    const [showTest, setShowTest] = useState(false);

    const handleTaskUpdate = useCallback(
        (taskId: string, updates: Partial<Task>) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updates } : task
                )
            );
            console.log("Task updated:", taskId, updates);
        },
        []
    );

    const handleTaskDelete = useCallback((taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        console.log("Task deleted:", taskId);
    }, []);

    const handleRefresh = useCallback(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log("Data refreshed");
        }, 1000);
    }, []);

    return (
        <SchillingWidgets>
            <ThemeProvider config={{ theme: "light", useTailwind: false }}>
                <div className="App">
                    <header className="App-header">
                        <h1>Schilling Widgets System Demo</h1>
                        <p>TaskManager Widget Demonstration</p>
                        <button onClick={() => setShowTest(!showTest)}>
                            {showTest ? "Hide Test" : "Show Test"}
                        </button>
                    </header>

                    {showTest && <SimpleDemo />}

                    <main className="App-main">
                        <div className="container">
                            <h2>Task Management Dashboard</h2>

                            {/* TaskManager Widget */}
                            <div className="task-manager-container">
                                <TaskManager
                                    tasks={tasks}
                                    height={600}
                                    enableInlineEdit={true}
                                    enableRealTimeUpdates={true}
                                    onTaskUpdate={handleTaskUpdate}
                                    onTaskDelete={handleTaskDelete}
                                    onRefresh={handleRefresh}
                                    loading={isLoading}
                                />
                            </div>

                            <div className="demo-info">
                                <h3>Demo Information</h3>
                                <p>
                                    This demo shows the TaskManager widget with{" "}
                                    {tasks.length} sample tasks.
                                </p>
                                <p>Features demonstrated:</p>
                                <ul>
                                    <li>Task viewing and editing</li>
                                    <li>Status management</li>
                                    <li>Progress tracking</li>
                                    <li>Priority indicators</li>
                                    <li>Tag system</li>
                                    <li>Real-time updates</li>
                                </ul>
                            </div>

                            <div className="demo-controls">
                                <button
                                    onClick={handleRefresh}
                                    disabled={isLoading}
                                    className="refresh-btn"
                                >
                                    {isLoading
                                        ? "Refreshing..."
                                        : "Refresh Data"}
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </SchillingWidgets>
    );
}

export default App;
