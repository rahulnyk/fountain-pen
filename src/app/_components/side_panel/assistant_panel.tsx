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
import { FaPenNib } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export type tabOption = {
    action: string;
    display: string;
    id: string;
    description?: string;
    icon: JSX.Element;
    component: JSX.Element;
    disabled: boolean;
};

const tabOptions: tabOption[] = [
    {
        action: "webLinks",
        display: "Add Research Relevant To The Article",
        id: "assistant_tab_1",
        description:
            "Use my research to suggest writing points for the current section",
        icon: <MdAddLink className="mr-1 size-6 py-1" />,
        component: <ReferencesPanel />,
        disabled: false,
    },
    {
        action: "semanticSearch",
        display: "Find Relevant Research For Current Section",
        id: "assistant_tab_2",
        description:
            "Search for exerpts in my documents relevant to current section",
        icon: <MdOutlineDocumentScanner className="mr-1 size-6 py-1" />,
        component: <Excerpts />,
        disabled: false,
    },
    {
        action: "generateHeadings",
        display: "Suggest Outline For The Article",
        id: "assistant_tab_3",
        description:
            "Headings for the article based on the title and the title notes",
        icon: <FaHeading className="mr-1 size-5 py-1" />,
        component: <Outline />,
        disabled: false,
    },
    {
        action: "suggestWritingPoints",
        display: "Extract Writing Points From Research",
        id: "assistant_tab_4",
        description:
            "Use my research to suggest writing points for the current section",
        icon: <PiListBulletsBold className="mr-1 size-6 py-1" />,
        component: <WritingPointsSuggestions />,
        disabled: false,
    },
    {
        action: "suggestFromResearch",
        display: "Suggest Content For The Current Section",
        id: "assistant_tab_5",
        description:
            "Content based on the current section heading, text and notes",
        icon: <ImParagraphLeft className="mr-1 size-5 py-1" />,
        component: <ContentSuggestions />,
        disabled: false,
    },
    {
        action: "paraphrase",
        display: "Paraphrase Current Section Content",
        id: "assistant_tab_6",
        description: "Paraphrase the content based on a particular style",
        icon: <FaPenToSquare className="mr-1 size-5 py-1" />,
        component: <Paraphrase />,
        disabled: false,
    },
    {
        action: "none",
        display: "Empty tab",
        id: "assistant_tab_7",
        description: "Empty tab",
        icon: <p className="w-10" />,
        component: <p />,
        disabled: true,
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
                                    index == tabIndex && "tab-active",
                                    option.disabled && "tab-disabled"
                                )}
                                onClick={() => {
                                    if (option.disabled) {
                                        return;
                                    }
                                    setTabIndex(index);
                                }}
                                key={`ai_tab_${index}`}
                            >
                                {option.icon}
                            </a>
                            <div
                                key={`ai_panel_${index}`}
                                role="tabpanel"
                                className={clsx(
                                    "tab-content bg-base-100 border-base-300 rounded-lg p-6 px-2",
                                    "dark:bg-zinc-800 bg-white w-full"
                                )}
                            >
                                <div className="flex w-full relative py-2">
                                    <p
                                        className={clsx(
                                            "absolute right-2 top-0 text-xs opacity-50"
                                        )}
                                    >
                                        {option.display}
                                    </p>
                                </div>
                                {option.component}
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};
