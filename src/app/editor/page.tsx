// "use client";

import { Suspense } from "react";
import FprEditor from "../_components/fpr_editor";
import { LoadingSpinner } from "../_components/loading_spinner";

export default function Editor() {
    return (
        <div className="flex h-full flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
                <FprEditor />
            </Suspense>
        </div>
    );
}
