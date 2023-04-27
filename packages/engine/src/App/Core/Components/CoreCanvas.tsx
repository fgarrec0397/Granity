import canvasConfig from "@engine/App/Core/configs/canvas";
import useEditor from "@engine/App/Editor/_actions/hooks/useEditor";
import Scenes from "@engine/App/Scenes/Scenes";
import { useContextBridge } from "@granity/three/drei";
import { Canvas } from "@granity/three/fiber";
import { pxToRem, useTheme } from "@granity/ui";
import { Context, FC } from "react";

import useCore from "../_actions/hooks/useCore";

type Props = {
    contexts: Context<any>[];
};

const CoreCanvas: FC<Props> = ({ contexts }) => {
    const theme = useTheme();
    const { onCorePointerMissed } = useCore();
    const { isPreview } = useEditor();
    const ContextBridge = useContextBridge(...contexts);
    const previewWarningBorderWidth = 4;

    const onPointerMissed = (event: MouseEvent) => {
        if ((event.target as Element)?.tagName === "CANVAS") {
            onCorePointerMissed(event);
        }
    };

    return (
        <Canvas
            style={{
                background: theme.palette.background.gradient,
                ...(isPreview
                    ? {
                          padding: pxToRem(previewWarningBorderWidth),
                          height: `calc(100vh - ${pxToRem(previewWarningBorderWidth)})`,
                          boxShadow: `${theme.palette.warning.main} 0px 0px 0px ${pxToRem(
                              previewWarningBorderWidth
                          )} inset`,
                      }
                    : {}),
            }}
            {...canvasConfig}
            onPointerMissed={onPointerMissed}
        >
            <ContextBridge>
                <Scenes />
            </ContextBridge>
        </Canvas>
    );
};

export default CoreCanvas;
