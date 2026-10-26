const TaskCard = ({ task, subject, onEdit, onDelete, onToggle }) => {
    return (
        <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div
                className="h-14 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: subject?.color || "gray" }}
            />

            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="mt-1 h-5 w-5 cursor-pointer"
            />

            <div className="min-w-0 flex-1">
                <h2 className={`text-lg font-semibold ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}`}>
                    {task.title}
                </h2>

                {task.description && (
                    <p className="mt-1 break-words text-sm text-gray-600">
                        {task.description}
                    </p>
                )}

                {task.dueDate && (
                    <p className="mt-1 break-words text-sm text-gray-600">
                        Due: {task.dueDate}
                    </p>
                )}
            </div>
            
            <div className="flex shrink-0 gap-2">
                <button
                    className="cursor-pointer rounded-lg bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-600"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>

                <button className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 cursor-pointer" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;