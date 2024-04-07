import { create } from "zustand";

interface sectionContextStore {
    title: string | null;
    titleNotes: string | null;
    heading: string | null;
    notes: string | null;
    text: string | null;
    setTitle: (title: string) => void;
    setTitleNotes: (titleNotes: string) => void;
    setHeading: (heading: string) => void;
    setNotes: (notes: string) => void;
    setText: (text: string) => void;
    setContext: ({
        title,
        titleNotes,
        heading,
        notes,
        text,
    }: {
        title?: string | null;
        titleNotes?: string | null;
        heading?: string | null;
        notes?: string | null;
        text?: string | null;
    }) => void;
}

export const useSectionContext = create<sectionContextStore>()((set) => ({
    title: null,
    titleNotes: null,
    heading: null,
    notes: null,
    text: null,
    setTitle: (title) => set(() => ({ title })),
    setTitleNotes: (titleNotes) => set(() => ({ titleNotes })),
    setHeading: (heading) => set(() => ({ heading })),
    setNotes: (notes) => set(() => ({ notes })),
    setText: (text) => set(() => ({ text })),
    setContext: ({ title, titleNotes, heading, notes, text }) =>
        set((state) => ({
            title: title ? title : state.title,
            titleNotes: titleNotes ? title : state.titleNotes,
            heading: heading ? heading : state.heading,
            notes: notes ? notes : state.notes,
            text: text ? text : state.text,
        })),
}));
