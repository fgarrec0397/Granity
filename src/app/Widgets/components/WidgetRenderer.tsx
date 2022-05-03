import { ThreeEvent } from "@react-three/fiber";
import React, { FC, useCallback, useRef, useState } from "react";
import { Object3D } from "three";
import { FeaturesWidgetsProps } from "../../../Features/collector";
import { useAppSelector } from "../../Core/store";

type Props<T = FeaturesWidgetsProps> = {
    component: FC<T>;
    name: string;
    id: string;
};

const WidgetRenderer: FC<Props> = ({ component, name, id }) => {
    const Component = component;
    const ref = useRef<Object3D>();
    const [hovered, setHover] = useState(false);
    const { widgetsDictionary } = useAppSelector((state) => state.widgets);

    const componentProps = useCallback(() => {
        const props: any = {}; // TODO -- fix any type here

        for (const option in widgetsDictionary[id]?.options) {
            if ({}.hasOwnProperty.call(widgetsDictionary[id]?.options, option)) {
                props[option] = widgetsDictionary[id].options[option].value;
            }
        }

        return props;
    }, [id, widgetsDictionary]);

    const handleOnPointerOver = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(true);
    };

    const handleOnPointerOut = (event: ThreeEvent<PointerEvent>): void => {
        event.stopPropagation();
        setHover(false);
    };

    return (
        <group
            ref={ref}
            name={name}
            onPointerOver={handleOnPointerOver}
            onPointerOut={handleOnPointerOut}
            {...widgetsDictionary[id]?.properties}
        >
            <Component {...componentProps()} hovered={hovered} />
        </group>
    );
};
export default WidgetRenderer;
