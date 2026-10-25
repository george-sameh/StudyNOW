import { useState, useEffect } from "react";
import Form from "../components/Form";
import SubjectCard from "../components/SubjectCard";

export default function Subjects() {
    const subjectFields = [
        {
            name: "name",
            placeholder: "Subject Name",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            placeholder: "Subject Description",
        },
        {
            name: "color",
            type: "select",
            placeholder: "Select Color",
            options: [
                { value: "red", label: "Red" },
                { value: "blue", label: "Blue" },
                { value: "green", label: "Green" },
                { value: "yellow", label: "Yellow" },
                { value: "purple", label: "Purple" },
                { value: "pink", label: "Pink" },
                { value: "orange", label: "Orange" },
                { value: "gray", label: "Gray" },
            ],
        },
    ];
    
    const [subjects, setSubjects] = useState(() => {
        const storedSubjects = localStorage.getItem("subjects");
        return storedSubjects ? JSON.parse(storedSubjects) : [];
    });

    useEffect(() => {
        localStorage.setItem("subjects", JSON.stringify(subjects));
    }, [subjects]);

    const [values, setValues] = useState({
        name: "",
        description: "",
        color: "gray",
    });

    const [showForm, setShowForm] = useState(false);
    const [editingSubjectId, setEditingSubjectId] = useState(null);

    const handleAddClick = () => {
        setEditingSubjectId(null);
        setValues({
            name: "",
            description: "",
            color: "gray",
        });
        setShowForm(true);
    };

    const handleUpdate = () => {
        if (!values.name.trim()) {
            alert("Subject name cannot be empty.");
            return;
        }

        if (editingSubjectId !== null) {
            setSubjects((prevSubjects) =>
                prevSubjects.map((subject) =>
                    subject.id === editingSubjectId
                        ? {
                            ...subject,
                            name: values.name.trim(),
                            description: values.description.trim(),
                            color: values.color,
                        }
                        : subject
                )
            );
        } else {
            const newSubject = {
                id: crypto.randomUUID(),
                name: values.name.trim(),
                description: values.description.trim(),
                color: values.color,
            };

            setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
        }

        setValues({
            name: "",
            description: "",
            color: "gray",
        });
        setEditingSubjectId(null);
        setShowForm(false);
    };

    const handleEdit = (id, subject) => {
        setEditingSubjectId(id);
        setValues({
            name: subject.name,
            description: subject.description,
            color: subject.color,
        });
        setShowForm(true);
    };

    const handleChange = (fieldName, value) => {
        setValues((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const resetForm = () => {
        setValues({
            name: "",
            description: "",
            color: "gray",
        });
        setEditingSubjectId(null);
        setShowForm(false);
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
                <Form
                    fields={subjectFields}
                    values={values}
                    onChange={handleChange}
                    onSubmit={handleUpdate}
                    onCancel={resetForm}
                    submitLabel={
                        editingSubjectId !== null
                            ? "Save Changes"
                            : "Add Subject"
                    }
                />
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