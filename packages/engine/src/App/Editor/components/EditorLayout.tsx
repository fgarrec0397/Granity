import { FC } from "react";

import EditorBottomPanel from "./EditorBottomPanel/EditorBottomPanel";
import EditorCustomDragLayer from "./EditorCommon/EditorCustomDragLayer";
import EditorHeader from "./EditorHeader/EditorHeader";
import EditorRightPanel from "./EditorRightPanel/EditorRightPanel";
import EditorWrapper from "./EditorWrapper";
import { EditorLeftPanel } from "./index";

const EditorUI: FC = () => {
    return (
        <>
            <EditorWrapper>
                <EditorHeader />
                <EditorLeftPanel />
                <EditorRightPanel />
                <EditorBottomPanel />
            </EditorWrapper>
            <EditorCustomDragLayer />
        </>
    );
};

export default EditorUI;
