import Editor from "@engine/App/Editor/Editor";
import { GamePreview } from "@engine/App/Game/Components";
import { FC } from "react";

import useUI from "./_actions/hooks/useUI";
import UIClosePreviewButton from "./Components/UIClosePreviewButton";

const UI: FC = () => {
    const { showEditorUI, showGameUI, IsUIPreview } = useUI();

    return (
        <>
            {showEditorUI && <Editor.EditorUI />}
            {showGameUI && <GamePreview.GameUI />}
            {IsUIPreview && <UIClosePreviewButton />}
        </>
    );
};

export default UI;
