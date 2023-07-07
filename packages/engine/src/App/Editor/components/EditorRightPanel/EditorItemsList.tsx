import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { DndContextProvider, Draggable, Droppable, OnDrop } from "@granity/draggable";
import { clone, RecursiveArrayOfIds } from "@granity/helpers";
import { Box, List, pxToRem, Typography } from "@granity/ui";
import { FC, ReactElement, useEffect, useState } from "react";

import { DraggableTypes } from "../../_actions/editorConstants";
import { EditorListDragItem } from "../../_actions/editorTypes";
import {
    handleMoveToDifferentParent,
    handleMoveWithinParent,
    handleUnNest,
    splitPath,
    updatePaths,
} from "../../_actions/utilities/dnd";
import EditorCustomDragLayer from "../EditorCommon/EditorCustomDragLayer";
import EditorItemsListItem from "./EditorItemsListItem";

export type EditorItemsListButtonProps = {
    text: string;
    callback?: () => void;
};

export type EditorItemsListProps = {
    parentId: string;
    itemsDictionaryIds?: RecursiveArrayOfIds<string>;
    noItemsText: string;
    isDragAndDropEnabled?: boolean;
    editModal?: (id: string) => ReactElement;
    isVisible?: (id: string) => boolean | undefined;
    isDefault?: (id: string) => boolean | undefined;
    handleVisibility?: (id: string) => void;
    displayItemName?: (id: string) => string | undefined;
    handleClickRow?: (id: string) => void;
    handleClickRemove?: (id: string) => void;
    isActionRowSelected?: (id: string) => boolean;
    isItemNesting?: (id: string) => boolean;
    onIsNestingChange?: (id: string, isNesting: boolean) => void;
    onDropItem?: (newItems: RecursiveArrayOfIds<string>) => void;
    onNesting?: (hoveredItemId: string, draggingItemId: string) => void;
    moveItem?: (itemDrag: EditorListDragItem, itemDrop: EditorListDragItem) => void;
    dropItem?: (
        isNesting: boolean,
        itemDrag: EditorListDragItem,
        itemDrop: EditorListDragItem
    ) => void;
};

export interface DragAndDropItem {
    id: number;
    text: string;
}

export interface DragAndDropItemCards {
    cards: DragAndDropItem[];
}

const EditorItemsList = ({
    parentId,
    itemsDictionaryIds,
    noItemsText,
    isDragAndDropEnabled = true,
    editModal,
    isVisible,
    isDefault,
    handleVisibility,
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
    isItemNesting,
    onIsNestingChange,
    onDropItem,
    onNesting,
    moveItem,
    dropItem,
}: EditorItemsListProps) => {
    const { displayWidgetName } = useWidgets();
    const { displaySceneName } = useScenes();

    if (!itemsDictionaryIds) {
        return null;
    }

    return (
        <List>
            {itemsDictionaryIds.length > 0 ? (
                itemsDictionaryIds.map((item, index) => {
                    const parentItemName = displayItemName
                        ? displayItemName(item.id)
                        : displayWidgetName(item.id)
                        ? displayWidgetName(item.id)
                        : displaySceneName(item.id);

                    if (isDragAndDropEnabled) {
                        return (
                            <Draggable<HTMLLIElement>
                                key={item.id}
                                dragItem={{
                                    id: item.id,
                                    parentId,
                                    index,
                                    path: item.path,
                                    title: parentItemName || "",
                                    type: DraggableTypes.ListItem,
                                    children: item.children,
                                }}
                                accept={[DraggableTypes.ListItem]}
                            >
                                {(provided, snapshot) => {
                                    return (
                                        <EditorItemsListItem
                                            {...provided}
                                            id={item.id}
                                            itemChildren={item.children}
                                            itemsDictionaryIds={itemsDictionaryIds}
                                            index={index}
                                            itemName={parentItemName}
                                            editModal={editModal}
                                            isVisible={isVisible}
                                            isDefault={isDefault}
                                            handleVisibility={handleVisibility}
                                            handleClickRow={handleClickRow}
                                            handleClickRemove={handleClickRemove}
                                            isActionRowSelected={isActionRowSelected}
                                            isItemNesting={isItemNesting}
                                            onIsNestingChange={onIsNestingChange}
                                            onNesting={onNesting}
                                            moveItem={moveItem}
                                            dropItem={dropItem}
                                            isDragging={snapshot.isDragging}
                                            isOverWhileDragging={snapshot.isOver}
                                        >
                                            {item.children?.length ? (
                                                // <Droppable
                                                //     id={item.id}
                                                //     parentId={parentId}
                                                //     index={index}
                                                //     path={item.path}
                                                //     accept={[DraggableTypes.ListItem]}
                                                // >
                                                //     {(providedStyle) => {
                                                //         return (
                                                <Box
                                                    // {...providedStyle}
                                                    sx={{
                                                        padding: pxToRem(0, 0, 0, 10),
                                                    }}
                                                >
                                                    <EditorItemsList
                                                        itemsDictionaryIds={item.children || []}
                                                        parentId={item.id}
                                                        noItemsText={noItemsText}
                                                        editModal={editModal}
                                                        isVisible={isVisible}
                                                        isDefault={isDefault}
                                                        handleVisibility={handleVisibility}
                                                        displayItemName={displayItemName}
                                                        handleClickRow={handleClickRow}
                                                        handleClickRemove={handleClickRemove}
                                                        isActionRowSelected={isActionRowSelected}
                                                        isItemNesting={isItemNesting}
                                                        onIsNestingChange={onIsNestingChange}
                                                        onDropItem={onDropItem}
                                                        onNesting={onNesting}
                                                    />
                                                </Box>
                                            ) : //             );
                                            //         }}
                                            //     </Droppable>
                                            null}
                                        </EditorItemsListItem>
                                    );
                                }}
                            </Draggable>
                        );
                    }

                    return (
                        <EditorItemsListItem
                            key={item.id}
                            id={item.id}
                            itemChildren={item.children}
                            itemsDictionaryIds={itemsDictionaryIds}
                            index={index}
                            itemName={parentItemName}
                            editModal={editModal}
                            isVisible={isVisible}
                            isDefault={isDefault}
                            handleVisibility={handleVisibility}
                            handleClickRow={handleClickRow}
                            handleClickRemove={handleClickRemove}
                            isActionRowSelected={isActionRowSelected}
                            isDragging={false}
                        >
                            <Box
                                sx={{
                                    padding: pxToRem(0, 0, 0, 10),
                                }}
                            >
                                <EditorItemsList
                                    itemsDictionaryIds={item.children!}
                                    parentId={item.id}
                                    noItemsText={noItemsText}
                                    editModal={editModal}
                                    isVisible={isVisible}
                                    isDefault={isDefault}
                                    handleVisibility={handleVisibility}
                                    displayItemName={displayItemName}
                                    handleClickRow={handleClickRow}
                                    handleClickRemove={handleClickRemove}
                                    isActionRowSelected={isActionRowSelected}
                                    isItemNesting={isItemNesting}
                                    onIsNestingChange={onIsNestingChange}
                                    onDropItem={onDropItem}
                                    onNesting={onNesting}
                                    isDragAndDropEnabled={isDragAndDropEnabled}
                                />
                            </Box>
                        </EditorItemsListItem>
                    );
                })
            ) : (
                <Typography>{noItemsText}</Typography>
            )}
        </List>
    );
};

type EditorItemsListContainerProps = Omit<
    EditorItemsListProps,
    "moveItem" | "dropItem" | "parentId"
>;

export const EditorItemsListContainer: FC<EditorItemsListContainerProps> = ({
    itemsDictionaryIds,
    noItemsText,
    editModal,
    isVisible,
    isDefault,
    handleVisibility,
    displayItemName,
    handleClickRow,
    handleClickRemove,
    isActionRowSelected,
    onDropItem,
    isDragAndDropEnabled,
}) => {
    const [items, setItems] = useState(itemsDictionaryIds);

    useEffect(() => {
        console.log(itemsDictionaryIds, "itemsDictionaryIds");

        if (!itemsDictionaryIds) {
            return;
        }

        setItems(updatePaths(itemsDictionaryIds));
    }, [itemsDictionaryIds]);

    if (!itemsDictionaryIds) {
        return null;
    }

    const onDrop: OnDrop = ({ source, destination, dropType, sameSource }) => {
        console.log({ source, destination, dropType, sameSource });

        if (!destination) {
            return;
        }

        if (source.id === destination.id) {
            return;
        }

        const clonedItems = clone(items) || [];
        const splitSrcPath = splitPath(source.path);
        const splitDestPath = splitPath(destination?.path);

        let updatedItems = clonedItems;

        if (dropType === "move") {
            if (sameSource) {
                updatedItems = handleMoveWithinParent(clonedItems, splitSrcPath, splitDestPath);
            } else {
                if (splitSrcPath.length > splitDestPath.length) {
                    console.log({ splitSrcPath, splitDestPath }, "unNest");

                    updatedItems = handleUnNest(clonedItems, splitSrcPath, splitDestPath);
                } else {
                    updatedItems = handleMoveToDifferentParent(
                        clonedItems,
                        splitSrcPath,
                        splitDestPath
                    );
                }
            }
        }

        if (dropType === "combine") {
            if (sameSource) {
                const newDestPath = [...splitDestPath, 0];

                updatedItems = handleMoveToDifferentParent(clonedItems, splitSrcPath, newDestPath);
            } else {
                if (splitSrcPath.length > splitDestPath.length) {
                    const newDestPath = [...splitDestPath, 0];

                    updatedItems = handleUnNest(clonedItems, splitSrcPath, newDestPath);
                } else {
                    const newDestPath = [...splitDestPath, 0];

                    updatedItems = handleMoveToDifferentParent(
                        clonedItems,
                        splitSrcPath,
                        newDestPath
                    );
                }
            }
        }

        setItems(updatedItems);
        onDropItem?.(updatedItems);
    };

    return (
        <DndContextProvider onDrop={onDrop} itemsDictionaryIds={itemsDictionaryIds}>
            <EditorCustomDragLayer />
            <Draggable<HTMLDivElement>
                dragItem={{
                    id: "container",
                    index: 0,
                    parentId: "container",
                    type: "container",
                }}
                accept={[DraggableTypes.ListItem]}
            >
                {(providedStyle) => {
                    return (
                        <Box
                            ref={providedStyle.ref}
                            sx={{ ...(providedStyle.style ? providedStyle.style : {}) }}
                        >
                            <EditorItemsList
                                parentId="container"
                                itemsDictionaryIds={items}
                                noItemsText={noItemsText}
                                editModal={editModal}
                                isVisible={isVisible}
                                isDefault={isDefault}
                                handleVisibility={handleVisibility}
                                displayItemName={displayItemName}
                                handleClickRow={handleClickRow}
                                handleClickRemove={handleClickRemove}
                                isActionRowSelected={isActionRowSelected}
                                isDragAndDropEnabled={isDragAndDropEnabled}
                            />
                        </Box>
                    );
                }}
            </Draggable>
        </DndContextProvider>
    );
};

export default EditorItemsList;
