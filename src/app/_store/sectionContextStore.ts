import { create } from "zustand";

interface sectionContextStore {
    title: string | null;
    titleNotes: string | null;
    heading: string | null;
    notes: string | null;
    text: string | null;
    notesString: string | null; // This is to propogate the changes in the notes.
    setTitle: (title: string | null) => void;
    setTitleNotes: (titleNotes: string | null) => void;
    setHeading: (heading: string | null) => void;
    setNotes: (notes: string | null) => void;
    setText: (text: string | null) => void;
    setNotesString: (txt: string | null) => void;
    // setContext: ({
    //     title,
    //     titleNotes,
    //     heading,
    //     notes,
    //     text,
    // }: {
    //     title?: string | null;
    //     titleNotes?: string | null;
    //     heading?: string | null;
    //     notes?: string | null;
    //     text?: string | null;
    // }) => void;
}

export const useSectionContext = create<sectionContextStore>()((set) => ({
    title: null,
    titleNotes: null,
    heading: null,
    notes: null,
    text: null,
    notesString: null,
    setNotesString: (txt) => set(() => ({ notesString: txt })),
    setTitle: (title) => set(() => ({ title })),
    setTitleNotes: (titleNotes) => set(() => ({ titleNotes })),
    setHeading: (heading) => set(() => ({ heading })),
    setNotes: (notes) => set(() => ({ notes })),
    setText: (text) => set(() => ({ text })),
    // setContext: ({ title, titleNotes, heading, notes, text }) =>
    //     set((state) => ({
    //         title: title ? title : state.title,
    //         titleNotes: titleNotes ? title : state.titleNotes,
    //         heading: heading ? heading : state.heading,
    //         notes: notes ? notes : state.notes,
    //         text: text ? text : state.text,
    //     })),
}));
