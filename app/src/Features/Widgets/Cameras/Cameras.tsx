import { useHelper } from "@react-three/drei";
import { FC, useEffect, useRef } from "react";
import { Camera } from "@react-three/fiber";
import { CameraHelper } from "three";
import { EditableWidget } from "../../../App/Editor/types";
import useCameras from "../../../App/Scene/hooks/useCameras";
import { WidgetModule } from "../../../App/Widgets/types";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    const { addCamera } = useCameras();
    const cameraRef = useRef<Camera>(null!);

    useEffect(() => {
        addCamera({ cameraRef });
    }, [addCamera]);

    useHelper(cameraRef, CameraHelper);

    return (
        <>
            <perspectiveCamera ref={cameraRef} />;
            {/* <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
            </mesh> */}
        </>
    );
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    editorOptions: {
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
            </mesh>
        ),
    },
    widgetDefinition: {
        name: "Cameras",
    },
};
