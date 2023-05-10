import { useAppDispatch } from "@engine/App/Core/_actions/_data/state/store";
import { useCallback } from "react";

import { EditorModesAvailable, EditorStatus } from "../../editorConstants";
import {
    setCurrentMode,
    setEditorStatus,
    setHasEdited,
    setHasEditorOpened,
    setIsEditing,
    setIsGridEnabled,
    setIsMultipleSelect,
} from "../state/editorReducer";

export default () => {
    const dispatch = useAppDispatch();

    const dispatchSetEditorStatus = useCallback(
        (value: EditorStatus) => dispatch(setEditorStatus(value)),
        [dispatch]
    );

    const dispatchSetIsEditing = useCallback(
        (value: boolean) => dispatch(setIsEditing(value)),
        [dispatch]
    );

    const dispatchSetHasEditorOpened = useCallback(
        () => dispatch(setHasEditorOpened()),
        [dispatch]
    );

    const dispatchSetHasEdited = useCallback(
        (value: boolean) => dispatch(setHasEdited(value)),
        [dispatch]
    );

    const dispatchSetIsMultipleSelect = useCallback(
        (value: boolean) => dispatch(setIsMultipleSelect(value)),
        [dispatch]
    );

    const dispatchSetIsGridEnabled = useCallback(
        (value: boolean) => dispatch(setIsGridEnabled(value)),
        [dispatch]
    );

    const dispatchSetCurrentMode = useCallback(
        (mode: EditorModesAvailable) => dispatch(setCurrentMode(mode)),
        [dispatch]
    );

    return {
        dispatchSetEditorStatus,
        dispatchSetIsEditing,
        dispatchSetHasEditorOpened,
        dispatchSetHasEdited,
        dispatchSetIsMultipleSelect,
        dispatchSetIsGridEnabled,
        dispatchSetCurrentMode,
    };
};
