import { useSlate } from "slate-react";
import { dropDownOptions } from "./assistant_button/assistant_menu_items";
import { useContext, useEffect, useState } from "react";
import { Headings } from "../main_editor/types";
import { Node } from "slate";
import { Excerpts } from "./excerpts";
import { Outline } from "./outline";
import { ContentSuggestions } from "./content_suggestions";
import { WritingPointsSuggestions } from "./writing_points_suggestions";
import { NotesContext } from ".";
import { useSectionContext } from "@/app/_store/sectionContextStore";

export const AssistantPanel = ({
    dropDownItem,
}: {
    dropDownItem: dropDownOptions;
}) => {
    const editor = useSlate();
    const setContext = useSectionContext((state) => state.setContext);
    const notesUpdates = useContext(NotesContext);
    const [action, setAction] = useState<string | undefined>();
    const getSectionText = () => {
        const sectionText = editor.getCurrentSectionText();
        return sectionText ? sectionText : null;
    };

    const getSectionNotes = () => {
        const sectionNotes = editor.getCurrentSectionNotes();
        return sectionNotes ? sectionNotes : null;
    };

    const getSectionHeading = () => {
        const currentSectionHeading = editor.getPreviousSibling([...Headings]);
        let text = null;
        if (currentSectionHeading) {
            const [n, _] = currentSectionHeading;
            text = Node.string(n);
        }
        return text;
    };

    const getTitle = () => {
        const title = editor.getTitleString();
        return title ? title : null;
    };

    const getTitleNotes = () => {
        const titleNotes = editor.getTitleNotes();
        return titleNotes ? titleNotes : null;
    };

    const updateContext = () => {
        setContext({
            title: getTitle(),
            titleNotes: getTitleNotes(),
            heading: getSectionHeading(),
            notes: getSectionNotes(),
            text: getSectionText(),
        });
    };

    useEffect(() => {
        setAction(dropDownItem.action);
        updateContext();
    }, [dropDownItem.action, editor.selection, notesUpdates]);
    // notesUpdates context can be shifted to the zuatand store. For now I am using a react context provider.

    useEffect(() => {
        updateContext();
    }, []);

    return (
        <div className="text-gray-800 dark:text-gray-200">
            {(action === "semanticSearch" && <Excerpts />) ||
                (action === "suggestFromResearch" && <ContentSuggestions />) ||
                (action === "generateHeadings" && <Outline />) ||
                (action === "suggestWritingPoints" && (
                    <WritingPointsSuggestions />
                ))}
        </div>
    );
};
