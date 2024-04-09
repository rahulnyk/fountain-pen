import { useSlate } from "slate-react";
import { useContext, useEffect, useState } from "react";
import { Headings } from "../main_editor/types";
import { Node } from "slate";
import { Excerpts } from "./excerpts";
import { Outline } from "./outline";
import { ContentSuggestions } from "./content_suggestions";
import { WritingPointsSuggestions } from "./writing_points_suggestions";
import { NotesContext } from ".";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { FaHeading } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { PiListBulletsBold } from "react-icons/pi";
import clsx from "clsx";

export type tabOption = {
    action: string;
    display: string;
    id: string;
    description?: string;
    icon: JSX.Element;
    component: JSX.Element;
};

const tabOptions: tabOption[] = [
    {
        action: "generateHeadings",
        display: "Generate Headings",
        id: "dropdown_1",
        description:
            "Headings for the article based on the title and the title notes",
        icon: <FaHeading className="mr-1 size-5 py-1" />,
        component: <Outline />,
    },
    {
        action: "semanticSearch",
        display: "Search Documents",
        id: "dropdown_3",
        description:
            "Search for exerpts in my documents relevant to current section",
        icon: <MdOutlineDocumentScanner className="mr-1 size-6 py-1" />,
        component: <Excerpts />,
    },
    {
        action: "suggestFromResearch",
        display: "Suggest Content",
        id: "dropdown_2",
        description:
            "Content based on the current section heading, text and notes",
        icon: <ImParagraphLeft className="mr-1 size-5 py-1" />,
        component: <ContentSuggestions />,
    },
    {
        action: "suggestWritingPoints",
        display: "Suggest Writing Points",
        id: "dropdown_4",
        description:
            "Use my research to suggest writing points for the current section",
        icon: <PiListBulletsBold className="mr-1 size-6 py-1" />,
        component: <WritingPointsSuggestions />,
    },
];

export const AssistantPanel = () => {
    const editor = useSlate();
    const [tabIndex, setTabIndex] = useState<number>(1);
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
        updateContext();
    }, [editor.selection, notesUpdates]);
    // notesUpdates context can be shifted to the zuatand store.
    // For now I am using a react context provider.

    useEffect(() => {
        if (tabIndex) {
            setAction(tabOptions[tabIndex].action);
        }
    }, [tabIndex]);

    useEffect(() => {
        updateContext();
    }, []);

    return (
        <>
            <div
                role="tablist"
                className={clsx("tabs tabs-lifted w-full pb-10")}
                key="assistant-panel"
            >
                {tabOptions.map((option, index) => {
                    return (
                        <>
                            <a
                                role="tab"
                                className={clsx(
                                    "tab [--tab-bg:#ffffff] dark:[--tab-bg:#27272a]",
                                    index == tabIndex && "tab-active"
                                )}
                                onClick={() => setTabIndex(index)}
                                key={`ai_tab_${index}`}
                            >
                                {option.icon}
                            </a>
                            <div
                                key={`ai_panel_${index}`}
                                role="tabpanel"
                                className={clsx(
                                    "tab-content bg-base-100 border-base-300 rounded-lg p-6 px-2",
                                    "dark:bg-zinc-800 bg-white w-auto"
                                )}
                            >
                                {option.component}
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};
