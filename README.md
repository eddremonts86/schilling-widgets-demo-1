# Schilling Widgets System Demo

This is a React demonstration project showcasing the **Schilling Widgets System** package, specifically featuring the **TaskManager** widget.

## 🚀 Features Demonstrated

### TaskManager Widget

-   **Task Management**: View, edit, and manage tasks with a modern interface
-   **Real-time Updates**: Live task updates with instant UI feedback
-   **Status Management**: Track task progress with visual status indicators
-   **Priority System**: High, medium, and low priority tasks with color coding
-   **Tag System**: Organize tasks with customizable tags
-   **Responsive Design**: Optimized for both desktop and mobile devices
-   **Accessibility**: Full keyboard navigation and screen reader support

## 📦 Package Information

This demo uses the `@schilling-apps/schilling-widgets-system` package which includes:

-   **Complete UI Component Library**: All Shadcn UI components
-   **Advanced Widgets**: TaskManager, InfiniteTable with virtualization
-   **TypeScript Support**: Full type safety and IntelliSense
-   **Theme System**: Light/dark mode with custom theming
-   **Data Management**: TanStack Query integration
-   **Flexible Styling**: Works with or without Tailwind CSS

## 🛠️ Installation & Setup

### Prerequisites

-   Node.js 16+
-   npm or yarn

### Installing the Demo

```bash
# Clone or download this demo project
cd schilling-widgets-demo

# Install dependencies
npm install

# Start the development server
npm start
```

### Using the Package in Your Own Project

```bash
# Install the package
npm install @schilling-apps/schilling-widgets-system

# Install peer dependencies
npm install react react-dom @tanstack/react-query lucide-react
```

## 💻 Usage Example

```tsx
import React, { useState, useCallback } from "react";
import {
    TaskManager,
    Task,
    QueryProvider,
    ThemeProvider,
} from "@schilling-apps/schilling-widgets-system";

const tasks: Task[] = [
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
    // ... more tasks
];

function App() {
    const [taskList, setTaskList] = useState(tasks);

    const handleTaskUpdate = useCallback(
        (taskId: string, updates: Partial<Task>) => {
            setTaskList((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, ...updates } : task
                )
            );
        },
        []
    );

    const handleTaskDelete = useCallback((taskId: string) => {
        setTaskList((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
        );
    }, []);

    return (
        <QueryProvider>
            <ThemeProvider defaultTheme="light">
                <TaskManager
                    tasks={taskList}
                    height={600}
                    enableInlineEdit={true}
                    enableRealTimeUpdates={true}
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete}
                    onRefresh={() => console.log("Refresh data")}
                />
            </ThemeProvider>
        </QueryProvider>
    );
}
```

## 🎯 Task Interface

```typescript
interface Task {
    id: string; // Unique identifier
    name: string; // Task name
    status: TaskStatus; // Current status
    reference: string; // Reference/code
    phase: string; // Project phase
    expectedStart: string; // Expected start date (ISO)
    expectedDue: string; // Expected due date (ISO)
    assignee: string; // Assigned person
    progress?: number; // Progress (0-100)
    priority?: "low" | "medium" | "high";
    description?: string; // Detailed description
    tags?: string[]; // Tags
}

type TaskStatus =
    | "Overdue"
    | "Blocked"
    | "In progress"
    | "On hold"
    | "Not started";
```

## 🎨 Customization

### Theme Configuration

The demo supports both light and dark themes:

```tsx
import { ThemeProvider } from "@schilling-apps/schilling-widgets-system";

<ThemeProvider defaultTheme="dark">{/* Your app */}</ThemeProvider>;
```

### CSS Variables

Customize colors by overriding CSS variables:

```css
:root {
    --primary: 210 100% 50%;
    --secondary: 210 50% 90%;
    /* ... other variables */
}
```

## 📱 Demo Features

This demo includes:

1. **Sample Tasks**: 5 diverse tasks with different statuses and priorities
2. **Interactive Management**: Edit tasks inline, update status, and track progress
3. **Real-time Updates**: See changes immediately reflected in the UI
4. **Responsive Layout**: Works on desktop, tablet, and mobile
5. **Theme Support**: Toggle between light and dark themes
6. **Performance**: Optimized rendering with virtualization for large datasets

## 🔗 Links

-   **Package**: [@schilling-apps/schilling-widgets-system](https://www.npmjs.com/package/@schilling-apps/schilling-widgets-system)
-   **Documentation**: [Complete API Reference](https://github.com/schilling-apps/schilling-widgets-system#readme)
-   **GitHub**: [Source Code](https://github.com/schilling-apps/schilling-widgets-system)

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/schilling-apps/schilling-widgets-system/blob/main/CONTRIBUTING.md) for details.

---

**Built with ❤️ using Schilling Widgets System v1.0.0**
