import Form from "../components/Form";
import TaskCard from "../components/TaskCard"
import { useState, useEffect } from "react";

export default function Tasks() {
    const [showForm, setShowForm] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [subjects] = useState(() => {
        const storedSubjects = localStorage.getItem("subjects");
        return storedSubjects ? JSON.parse(storedSubjects) : [];
    });

    const [values, setValues] = useState({
        title: "",
        description: "",
        subjectId: "",
        dueDate: "",
    });

    const taskFields = [
    {
        name: "title",
        placeholder: "Task Title",
        required: true,
    },
    {
        name: "description",
        type: "textarea",
        placeholder: "Task Description",
    },
    {
        name: "subjectId",
        type: "select",
        placeholder: "Select Subject",
        required: true,
        options: subjects.map((subject) => ({
            value: subject.id,
            label: subject.name,
        })),
    },
    {
        name: "dueDate",
        type: "date",
        placeholder: "Due Date",
    },
    ];

    const handleChange = (fieldName, value) => {
        setValues((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const handleEdit = (task) => {
        setValues({
            title: task.title,
            description: task.description,
            subjectId: task.subjectId,
            dueDate: task.dueDate,
        });
        setEditingTaskId(task.id);
        setShowForm(true);
    }

    const handleDelete = (id) => {
        if (!confirm("Are you sure you want to delete this task?")) {
            return;
        }

        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        )
    }

    const handleToggle = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        )
    }

    const handleAddClick = () => {
        setValues({
            title: "",
            description: "",
            subjectId: "",
            dueDate: "",
        });
        setShowForm(true);
        setEditingTaskId(null);
    };

    const handleSubmit = () => {
        if (!values.title.trim()) {
            alert("Task title cannot be empty.");
            return;
        }

        if (!values.subjectId) {
            alert("Please select a subject");
            return;
        }

        if (editingTaskId !== null) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === editingTaskId
                    ? {
                        ...task,
                        title: values.title.trim(),
                        description: values.description.trim(),
                        subjectId: values.subjectId,
                        dueDate: values.dueDate,
                    }
                    : task
                )
            );
        } else {
            const newTask = {
                id: crypto.randomUUID(),
                title: values.title.trim(),
                description: values.description.trim(),
                subjectId: values.subjectId,
                dueDate: values.dueDate,
                completed: false,
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);
        }

        setEditingTaskId(null);
        setShowForm(false);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="mx-auto w-full max-w-2xl p-4 flex flex-col gap-6">
            <div className="flex w-full items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
                <button className="rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition-all cursor-pointer" onClick={handleAddClick}>
                    Add Task
                </button>
            </div>

            {showForm && (
                <Form
                    fields={taskFields}
                    values={values}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={() => {setShowForm(false); setEditingTaskId(null); }}
                    submitLabel={editingTaskId !== null ? "Save Changes" : "Add Task"}
                />
            )}

            <div className="w-full flex flex-col gap-4">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        subject={subjects.find(
                            (subject) => subject.id === task.subjectId
                        )}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                ))}
            </div>
        </div>
    )
}