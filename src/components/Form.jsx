
export default function Form({
    fields,
    values,
    onChange,
    onSubmit,
    onCancel,
    submitLabel = "Save",
}) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="flex flex-col gap-3 rounded-lg border border-gray-200 p-4 shadow-sm"
        >
            {fields.map((field) => (
                <div key={field.name}>
                    {field.type === "select" ? (
                        <select
                            value={values[field.name] ?? ""}
                            onChange={(e) =>
                                onChange(field.name, e.target.value)
                            }
                            required={field.required}
                            className="w-full rounded border border-gray-300 p-2"
                        >
                            <option value="">{field.placeholder}</option>

                            {field.options.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === "textarea" ? (
                        <textarea
                            placeholder={field.placeholder}
                            value={values[field.name] ?? ""}
                            onChange={(e) =>
                                onChange(field.name, e.target.value)
                            }
                            required={field.required}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    ) : (
                        <input
                            type={field.type || "text"}
                            placeholder={field.placeholder}
                            value={values[field.name] ?? ""}
                            onChange={(e) =>
                                onChange(field.name, e.target.value)
                            }
                            required={field.required}
                            className="w-full rounded border border-gray-300 p-2"
                        />
                    )}
                </div>
            ))}

            <div className="flex gap-2">
                <button
                    type="submit"
                    className="rounded-lg bg-indigo-500 px-4 py-2 text-white transition hover:bg-indigo-600"
                >
                    {submitLabel}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-lg bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
