import { Select } from "@react-three/drei";
import { FC, useCallback } from "react";

import { useGetWidgets, useWidgetsActions } from "./_actions/hooks";
import useWidgets from "./_actions/hooks/useWidgets";
import useWidgetsConnector from "./_actions/hooks/useWidgetsConnector";
import { WidgetSceneObject } from "./_actions/widgetsTypes";
import WidgetRenderer from "./components/WidgetRenderer";
import { useHandleAddWidget, useHandleRemoveSelected } from "./widgetsBridge";

interface WidgetProps {
    widget: WidgetSceneObject;
}

const Widgets: FC = () => {
    const { selectWidget } = useWidgetsActions();
    const { getWidgetByMesh } = useGetWidgets();
    const { widgets } = useWidgets();

    useHandleAddWidget();

    useHandleRemoveSelected();

    useWidgetsConnector();

    const onSelectMesh = useCallback(
        (meshArray: THREE.Object3D[]) => {
            if (meshArray.length) {
                const { widget } = getWidgetByMesh(meshArray[0]);

                if (widget) {
                    selectWidget(widget);
                }
            }
        },
        [getWidgetByMesh, selectWidget]
    );

    return (
        <Select box multiple onChange={onSelectMesh}>
            {Object.keys(widgets).map((widgetId, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Widget key={index} widget={widgets[widgetId]} />
            ))}
        </Select>
    );
};

const Widget: FC<WidgetProps> = ({ widget }) => {
    const { id } = widget;

    if (id) {
        return <WidgetRenderer widget={widget} />;
    }

    return null;
};

export default Widgets;
