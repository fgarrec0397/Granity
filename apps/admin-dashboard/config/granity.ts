import { EngineConfig, WidgetModules } from "@granity/engine";
import { saveScenes } from "services/scenes";

let widgetsModules: WidgetModules[] = [];

const importWidgetsModules = (requireContext: any) => {
    const modules = {};
    requireContext.keys().forEach((key: string) => ((modules as any)[key] = requireContext(key)));
    widgetsModules = Object.keys(modules).map((x) => (modules as any)[x].widget);
};

importWidgetsModules(
    require.context("../../../packages/@granity-widgets/src/Widgets", true, /\.tsx$/)
);

export const granityConfig: EngineConfig = {
    widgetsModules,
    onSave: async (scenes) => {
        if (scenes) {
            const response = await saveScenes(scenes);

            if (!response.success) {
                return {
                    status: false,
                    message: response.errorMessage as string,
                };
            }

            if (response.success) {
                return {
                    status: true,
                    message: "Scenes saved with success!",
                };
            }
        }

        return {
            status: false,
            message: "An error occured",
        };
    },
};
