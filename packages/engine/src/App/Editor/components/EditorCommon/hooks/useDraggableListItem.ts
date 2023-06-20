import { EditorListDragItem } from "@engine/App/Editor/_actions/editorTypes";
import {
    DragSourceMonitor,
    getEmptyImage,
    Identifier,
    useDrag,
    useDrop,
    XYCoord,
} from "@granity/draggable";
import { RecursiveArrayOfIds } from "@granity/helpers";
import { useEffect, useRef, useState } from "react";

import { ItemTypes } from "../../EditorRightPanel/EditorItemsListItem";

export type DraggableListItem = {
    dragItem: EditorListDragItem;
    isDraggable?: boolean;
    itemsDictionaryIds: RecursiveArrayOfIds<string>;
    moveItem?: (dragIndex: number, hoverIndex: number | number[]) => void;
    dropItem?: (isNesting: boolean) => void;
};

export default ({
    dragItem,
    moveItem,
    itemsDictionaryIds,
    dropItem,
    isDraggable = true,
}: DraggableListItem) => {
    const ref = useRef<HTMLLIElement>(null);
    const [isNesting, setIsNesting] = useState(false);
    const [hasDropWhenNesting, setHasDropWhenNesting] = useState(false);
    const [itemHoveredId, setItemHoveredId] = useState<string>();
    const [draggingItemId, setDraggingItemId] = useState<string>();

    if (!isDraggable) {
        return;
    }

    const [{ handlerId }, drop] = useDrop<
        EditorListDragItem,
        void,
        { handlerId: Identifier | null }
    >(
        {
            accept: ItemTypes.LIST_ITEM,
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
            drop() {
                if (itemHoveredId) {
                    setItemHoveredId(undefined);
                }

                setItemHoveredId(dragItem.id);

                if (isNesting) {
                    setHasDropWhenNesting(true);
                }

                dropItem?.(isNesting); // , itemHoveredId, draggingItemId

                setIsNesting(false);
            },
            hover(item: EditorListDragItem, monitor) {
                const dragIndex = item.index;
                const hoverIndex = dragItem.index;
                const isChildItem = dragItem.path.match(/\//gm); // check if path contains /

                setDraggingItemId(item.id);

                if (!ref.current) {
                    return;
                }
                if (!moveItem) {
                    return;
                }

                if (hasDropWhenNesting) {
                    setHasDropWhenNesting(false);
                }

                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return setIsNesting(false);
                }

                const hoverItemBoundingRect = ref.current?.getBoundingClientRect();
                const hoverItemHeight = hoverItemBoundingRect.bottom - hoverItemBoundingRect.top;
                const draggingPercentage = 0.5;
                const hoverItemHeightPercentage = hoverItemHeight * draggingPercentage;
                const draggingDownwardTriggerPosition = hoverItemHeightPercentage;
                const draggingUpwardTriggerPosition = hoverItemHeight - hoverItemHeightPercentage;

                // Determine mouse position
                const clientOffset = monitor.getClientOffset();

                // Get pixels to the top
                const hoverClientY = (clientOffset as XYCoord).y - hoverItemBoundingRect.top;

                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < draggingDownwardTriggerPosition) {
                    if (hoverClientY < 5) {
                        return setIsNesting(false);
                    }

                    if (!isNesting) {
                        return setIsNesting(true);
                    }

                    return;
                }

                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > draggingUpwardTriggerPosition) {
                    if (hoverClientY > hoverItemHeight - 5) {
                        return setIsNesting(false);
                    }

                    if (!isNesting) {
                        return setIsNesting(true);
                    }

                    return;
                }

                // if (isChildItem) {
                //     // if (isNesting) {
                //     const newHoverIndex = dragItem.path.split("/").map((x) => Number(x)); // TODO - This gives an array with all the indexes
                //     moveItem(dragIndex, newHoverIndex);
                //     // }

                //     item.index = hoverIndex;

                //     setIsNesting(false);
                //     return;
                // }

                setIsNesting(false);

                // Time to actually perform the action
                moveItem(dragIndex, hoverIndex);

                item.index = hoverIndex;
            },
        },
        [itemsDictionaryIds]
    );

    const [{ isDragging }, drag, preview] = useDrag(
        {
            type: ItemTypes.LIST_ITEM,
            item: () => {
                return {
                    id: dragItem.id,
                    index: dragItem.index,
                    path: dragItem.path,
                    title: dragItem.title,
                    children: dragItem.children,
                };
            },
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
            isDragging: (monitor) => {
                return dragItem.id === monitor.getItem().id;
            },
        },
        [itemsDictionaryIds]
    );

    drag(drop(ref));

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return {
        ref,
        handlerId,
        isDragging,
        isNesting,
        hasDropWhenNesting,
        itemHoveredId,
        draggingItemId,
    };
};
