import { useSlate } from "slate-react";
import { useContext, useEffect, useState } from "react";
import { Headings } from "../main_editor/types";
import { Node } from "slate";
import { Excerpts } from "./excerpts";
import { Outline } from "./outline";
import { ContentSuggestions } from "./content_suggestions";
import { WritingPointsSuggestions } from "./writing_points_suggestions";
import { useSectionContext } from "@/app/_store/sectionContextStore";
import { FaHeading } from "react-icons/fa";
import { ImParagraphLeft } from "react-icons/im";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { PiListBulletsBold } from "react-icons/pi";
import { MdRebaseEdit } from "react-icons/md";
import { MdAddLink } from "react-icons/md";
import { ReferencesPanel } from "./references_panel";
import clsx from "clsx";
import { Paraphrase } from "./paraphrase";

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
        action: "webLinks",
        display: "Web Links",
        id: "assistant_tab_1",
        description:
            "Use my research to suggest writing points for the current section",
        icon: <MdAddLink className="mr-1 size-6 py-1" />,
        component: <ReferencesPanel />,
    },
    {
        action: "semanticSearch",
        display: "Search Documents",
        id: "assistant_tab_2",
        description:
            "Search for exerpts in my documents relevant to current section",
        icon: <MdOutlineDocumentScanner className="mr-1 size-6 py-1" />,
        component: <Excerpts />,
    },
    {
        action: "suggestWritingPoints",
        display: "Suggest Writing Points",
        id: "assistant_tab_3",
        description:
            "Use my research to suggest writing points for the current section",
        icon: <PiListBulletsBold className="mr-1 size-6 py-1" />,
        component: <WritingPointsSuggestions />,
    },
    {
        action: "generateHeadings",
        display: "Generate Headings",
        id: "assistant_tab_4",
        description:
            "Headings for the article based on the title and the title notes",
        icon: <FaHeading className="mr-1 size-5 py-1" />,
        component: <Outline />,
    },
    {
        action: "suggestFromResearch",
        display: "Suggest Content",
        id: "assistant_tab_5",
        description:
            "Content based on the current section heading, text and notes",
        icon: <ImParagraphLeft className="mr-1 size-5 py-1" />,
        component: <ContentSuggestions />,
    },
    {
        action: "paraphrase",
        display: "Paraphrase Content",
        id: "assistant_tab_6",
        description: "Paraphrase the content based on a particular style",
        icon: <MdRebaseEdit className="mr-1 size-5 py-1" />,
        component: <Paraphrase />,
    },
];

export const AssistantPanel = () => {
    const editor = useSlate();
    const [tabIndex, setTabIndex] = useState<number>(0);
    //
    const setTitle = useSectionContext((state) => state.setTitle);
    const setTitleNotes = useSectionContext((state) => state.setTitleNotes);
    const setHeading = useSectionContext((state) => state.setHeading);
    const setNotes = useSectionContext((state) => state.setNotes);
    const setText = useSectionContext((state) => state.setText);

    const notesString = useSectionContext((state) => state.notesString);
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
        setTitle(getTitle());
        setTitleNotes(getTitleNotes());
        setHeading(getSectionHeading());
        setNotes(getSectionNotes());
        setText(getSectionText());
    };

    useEffect(() => {
        updateContext();
        console.log("Assitant Panel Context Updated");
    }, [editor.selection, notesString]);

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
