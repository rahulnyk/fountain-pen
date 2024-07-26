import { useState } from "react";
import { useReferencesStore } from "@/app/_store/referencesStore";
import { References } from "@/app/_actions/ldb";
import { Button } from "../../button";
import clsx from "clsx";
import { saveReferencesToDb } from "@/app/_actions/ldb";
import embeddWebLink from "@/app/_actions/vector_store/embedd_weblink";

export const AddReferenceForm = ({}: {}) => {
    const placeholderReferences: Omit<References, "id"> = {
        name: "",
        source: "",
        description: "",
        type: "weblink",
    };

    const [isPending, setIsPending] = useState(false);

    const [formData, setFormData] = useState<Omit<References, "id">>(
        placeholderReferences
    );
    const addReference = useReferencesStore((state) => state.addReference);

    const handleSubmit = async (e: any) => {
        if (isPending) {
            return;
        }
        setIsPending(true);
        e.preventDefault();
        // Validate form data if needed

        // Call store action to add reference
        if (formData) {
            const reference = await saveReferencesToDb({
                reference: { ...formData, type: "weblink" },
            });
            console.log(reference);
            if (reference) {
                await embeddWebLink(reference);
                addReference(reference);
            }
        }

        // Clear form after submission
        setFormData(placeholderReferences);
        setIsPending(false);
    };

    const updateFormData = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const inputStyle = clsx(
        "appearance-none w-full py-2 px-0 leading-tight",
        "text-zinc-600 dark:text-zinc-400",
        "bg-transparent",
        "outline-none",
        "border-b border-zinc-100 focus:border-blue-200 dark:border-zinc-600 dark:focus:border-blue-600",
        "dark:invalid:border-pink-900 dark:invalid:text-pink-500 focus:invalid:border-pink-500",
        "invalid:border-pink-200 invalid:text-pink-500 focus:invalid:border-pink-500"
    );

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="px-4 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block dark:text-zinc-500 text-zinc-300 text-xs mb-2 w-full">
                        Source:
                        <input
                            type="url"
                            name="source"
                            value={formData.source}
                            onChange={updateFormData}
                            className={inputStyle}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block dark:text-zinc-500 text-zinc-300 text-xs mb-2 w-full">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={updateFormData}
                            className={inputStyle}
                            required
                        />
                    </label>
                </div>
                <div className="mb-4">
                    <label className="block dark:text-zinc-500 text-zinc-300 text-xs mb-2 w-full">
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={updateFormData}
                            className={inputStyle}
                        />
                    </label>
                </div>
                <Button
                    type="submit"
                    loading={isPending}
                    className=""
                >
                    ADD WEB PAGE
                </Button>
            </form>
        </div>
    );
};
