import { Card, List } from "antd";
import { FC } from "react";
import useWidgets from "@widgets/_actions/hooks/useWidgets";

const EditorItemsList: FC = () => {
    const { widgets } = useWidgets();

    return (
        <Card size="small" title="Elements on scene">
            <List
                size="small"
                bordered
                dataSource={widgets}
                renderItem={({ widgetDefinition }) => (
                    <List.Item>{widgetDefinition.name}</List.Item>
                )}
            />
        </Card>
    );
};

export default EditorItemsList;
