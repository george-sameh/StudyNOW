const SubjectCard = ({ subject, onEdit, onDelete }) => {
    const colors = {
        red: "bg-red-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        yellow: "bg-yellow-500",
        purple: "bg-purple-500",
        pink: "bg-pink-500",
        orange: "bg-orange-500",
        gray: "bg-gray-300",
    }

    return (
        <div className="flex w-full items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className={`h-14 w-1.5 shrink-0 rounded-full ${colors[subject.color] || colors.gray}`}/>

            <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                    {subject.name}
                </h2>

                <p className="mt-1 break-words text-sm text-gray-600">
                    {subject.description || "No description provided."}
                </p>
            </div>
            
            <div className="flex shrink-0 gap-2">
                <button className="rounded-lg bg-blue-500 px-3 py-2 text-white transition hover:bg-blue-600 cursor-pointer" onClick={onEdit}>
                    Edit
                </button>

                <button className="rounded-lg bg-red-500 px-3 py-2 text-white transition hover:bg-red-600 cursor-pointer" onClick={() => onDelete(subject.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default SubjectCard;