import { useState, useEffect } from "react";
import SubjectCard from "../components/SubjectCard";

export default function Subjects() {
    const [subjects, setSubjects] = useState(() => {
        const storedSubjects = localStorage.getItem("subjects");
        return storedSubjects ? JSON.parse(storedSubjects) : [];
    });

    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("gray");
    const [editingSubjectId, setEditingSubjectId] = useState(null);

    const handleAddClick = () => {
        setEditingSubjectId(null);
        setName("");
        setDescription("");
        setColor("gray");
        setShowForm(true);
    };

    const handleUpdate = () => {
        if (!name.trim()) {
            alert("Subject name cannot be empty.");
            return;
        }

        if (editingSubjectId !== null) {
            setSubjects((prevSubjects) =>
                prevSubjects.map((subject) =>
                    subject.id === editingSubjectId
                        ? {
                            ...subject,
                            name: name.trim(),
                            description: description.trim(),
                            color,
                        }
                        : subject
                )
            );
        } else {
            const newSubject = {
                id: crypto.randomUUID(),
                name: name.trim(),
                description: description.trim(),
                color,
            };

            setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
        }

        setName("");
        setDescription("");
        setColor("gray");
        setEditingSubjectId(null);
        setShowForm(false);
    };

    const handleEdit = (id, subject) => {
        setEditingSubjectId(id);
        setName(subject.name);
        setDescription(subject.description);
        setColor(subject.color);
        setShowForm(true);
    };

    const deleteSubject = (id) => {
        confirm("Are you sure you want to delete this subject?") &&
        setSubjects((prevSubjects) =>
            prevSubjects.filter((subject) => subject.id !== id)
        );
    };

    return (
        <div className="mx-auto w-full max-w-2xl p-4 flex flex-col gap-6">
            <div className="flex w-full items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">My Subjects</h1>
                <button className="rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition-all cursor-pointer" onClick={handleAddClick}>
                    Add Subject
                </button>
            </div>

            {showForm && (
                <div className="w-full rounded-lg border border-gray-300 p-4 shadow-md">
                    <input
                        type="text"
                        placeholder="Subject Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-2 w-full rounded border border-gray-300 p-2"
                        required
                    />

                    <textarea
                        placeholder="Subject Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mb-2 w-full rounded border border-gray-300 p-2"
                    />

                    <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="mb-2 w-full rounded border border-gray-300 p-2"
                    >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="yellow">Yellow</option>
                        <option value="purple">Purple</option>
                        <option value="pink">Pink</option>
                        <option value="orange">Orange</option>
                        <option value="gray">Gray</option>
                    </select>

                    <button
                        onClick={handleUpdate}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600 transition-all cursor-pointer"
                    >
                        {editingSubjectId !== null ? "Save Changes" : "Add Subject"}
                    </button>

                    <button
                        onClick={() => {
                            setShowForm(false);
                            setEditingSubjectId(null);
                            setName("");
                            setDescription("");
                            setColor("gray");
                        }}
                        className="ml-2 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <div className="w-full flex flex-col gap-4">
                {subjects.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        onEdit={() => handleEdit(subject.id, subject)}
                        onDelete={deleteSubject}
                    />
                ))}
            </div>
        </div>
    )
}