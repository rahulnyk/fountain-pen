// stores/referencesStore.js

import { create } from "zustand";
import { References } from "../_actions/ldb";

interface referencesStore {
    references: References[];
    addReference: (reference: References) => void;
    setReferences: (references: References[]) => void;
}

export const useReferencesStore = create<referencesStore>()((set) => ({
    references: [],
    addReference: (reference) =>
        set((state) => ({
            references: [...state.references, reference],
        })),
    setReferences: (references) => set(() => ({ references })),
}));
