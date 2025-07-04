import { useCallback, useState } from "react";
import type { Task } from "schilling-widgets-system";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Input,
    SchillingWidgets,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    TaskManager,
    ThemeProvider, // Import the configuration function
    getUseTailwind,
    setUseTailwind, // Import the configuration function
} from "schilling-widgets-system";
import StyleDebugComponent from "./StyleDebugComponent";

// Configure to use CSS-only styles instead of Tailwind
setUseTailwind(false);

// Debug: Check if the setting was applied
console.log("Using Tailwind?", getUseTailwind());

// Sample tasks from documentation
const SAMPLE_TASKS: Task[] = [
    {
        id: "1",
        name: "Implement authentication",
        status: "In progress",
        reference: "AUTH-001",
        phase: "Development",
        expectedStart: "2025-01-01",
        expectedDue: "2025-01-15",
        assignee: "John Doe",
        priority: "high",
        progress: 75,
        description: "Implement JWT authentication system",
        tags: ["auth", "security"],
    },
    {
        id: "2",
        name: "Design user interface",
        status: "Not started",
        reference: "UI-002",
        phase: "Design",
        expectedStart: "2025-01-10",
        expectedDue: "2025-01-20",
        assignee: "Jane Smith",
        priority: "medium",
        progress: 0,
        description: "Create mockups and prototypes",
        tags: ["ui", "design"],
    },
    {
        id: "3",
        name: "Setup CI/CD pipeline",
        status: "Blocked",
        reference: "CICD-003",
        phase: "DevOps",
        expectedStart: "2025-01-05",
        expectedDue: "2025-01-12",
        assignee: "Bob Wilson",
        priority: "high",
        progress: 30,
        description: "Configure automated deployment pipeline",
        tags: ["devops", "automation"],
    },
];

function App() {
    const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
    const [inputValue, setInputValue] = useState("");

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

    return (
        <SchillingWidgets>
            <ThemeProvider>
                <StyleDebugComponent />
                <div
                    style={{
                        padding: "20px",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    <Card style={{ marginBottom: "2rem" }}>
                        <CardHeader>
                            <CardTitle>Schilling Widgets System Demo</CardTitle>
                            <CardDescription>
                                Comprehensive demonstration of the widget
                                library capabilities
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Tabs defaultValue="components">
                        <TabsList>
                            <TabsTrigger value="components">
                                Basic Components
                            </TabsTrigger>
                            <TabsTrigger value="taskmanager">
                                Task Manager
                            </TabsTrigger>
                            <TabsTrigger value="advanced">
                                Advanced Components
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="components">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Basic Components Showcase
                                    </CardTitle>
                                    <CardDescription>
                                        Explore the fundamental components of
                                        the library
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "2rem",
                                        }}
                                    >
                                        <div>
                                            <h3
                                                style={{ marginBottom: "1rem" }}
                                            >
                                                Buttons
                                            </h3>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "1rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Button variant="default">
                                                    Default Button
                                                </Button>
                                                <Button variant="secondary">
                                                    Secondary
                                                </Button>
                                                <Button variant="outline">
                                                    Outline
                                                </Button>
                                                <Button variant="destructive">
                                                    Destructive
                                                </Button>
                                                <Button variant="ghost">
                                                    Ghost
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <h3
                                                style={{ marginBottom: "1rem" }}
                                            >
                                                Input & Badges
                                            </h3>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "1rem",
                                                }}
                                            >
                                                <Input
                                                    placeholder="Type something here..."
                                                    value={inputValue}
                                                    onChange={(e) =>
                                                        setInputValue(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "0.5rem",
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    <Badge>Default Badge</Badge>
                                                    <Badge variant="secondary">
                                                        Secondary
                                                    </Badge>
                                                    <Badge variant="destructive">
                                                        Error
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        Outline
                                                    </Badge>
                                                </div>
                                                {inputValue && (
                                                    <p>
                                                        You typed:{" "}
                                                        <strong>
                                                            {inputValue}
                                                        </strong>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="taskmanager">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Task Manager Widget</CardTitle>
                                    <CardDescription>
                                        Advanced task management with inline
                                        editing, filtering, and virtualization
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TaskManager
                                        tasks={tasks}
                                        height={600}
                                        enableInlineEdit={true}
                                        enableRealTimeUpdates={true}
                                        onTaskUpdate={handleTaskUpdate}
                                        onTaskDelete={handleTaskDelete}
                                        onRefresh={() =>
                                            console.log("Refresh data")
                                        }
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="advanced">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Advanced Components</CardTitle>
                                    <CardDescription>
                                        More complex components for rich user
                                        interfaces
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion
                                        type="single"
                                        collapsible
                                    >
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>
                                                What is Schilling Widgets?
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Schilling Widgets is a complete
                                                UI components library for React
                                                applications with TypeScript. It
                                                includes all essential Shadcn UI
                                                components, advanced widgets,
                                                and tools for data management
                                                with TanStack Query.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger>
                                                Key Features
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul>
                                                    <li>
                                                        Complete component
                                                        library (Button, Card,
                                                        Input, etc.)
                                                    </li>
                                                    <li>
                                                        Advanced widgets
                                                        (TaskManager,
                                                        InfiniteTable)
                                                    </li>
                                                    <li>
                                                        TypeScript-first
                                                        development
                                                    </li>
                                                    <li>
                                                        Flexible theming
                                                        (light/dark mode)
                                                    </li>
                                                    <li>
                                                        TanStack Query
                                                        integration
                                                    </li>
                                                    <li>
                                                        Works with or without
                                                        Tailwind CSS
                                                    </li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger>
                                                Performance
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                The library is optimized for
                                                performance with features like
                                                virtualization for large
                                                datasets, tree-shaking support,
                                                and efficient component
                                                re-rendering.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </ThemeProvider>
        </SchillingWidgets>
    );
}

export default App;
