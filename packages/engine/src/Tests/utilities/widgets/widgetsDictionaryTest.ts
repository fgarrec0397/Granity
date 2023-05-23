import { WidgetDictionary } from "@engine/App/Widgets/_actions/widgetsTypes";
import { uidGenerator } from "@granity/helpers";

import TestWidgetComponent from "./TestWidgetComponent";

export const widgetTestId1 = uidGenerator();
export const widgetTestId2 = uidGenerator();
export const widgetTestId3 = uidGenerator();

export const widgetsDictionaryTest: WidgetDictionary = {
    [widgetTestId1]: {
        component: TestWidgetComponent,
        id: widgetTestId1,
        hasRef: true,
        name: "widget1",
    },
    [widgetTestId2]: {
        component: TestWidgetComponent,
        id: widgetTestId2,
        hasRef: true,
        name: "widget2",
    },
    [widgetTestId3]: {
        component: TestWidgetComponent,
        id: widgetTestId3,
        name: "widget3",
    },
};
