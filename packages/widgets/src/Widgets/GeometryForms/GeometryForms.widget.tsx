import { createWidget, EditableWidget, FieldType, GameRigidBody } from "@granity/engine";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, position }) => {
    const GeometryComponent = shape;

    return (
        <GameRigidBody key={position.toString()} mass={0}>
            <mesh position={[0, 0, 0]}>
                <GeometryComponent />
                <meshStandardMaterial color={color} />
            </mesh>
        </GameRigidBody>
    );
};

export const widget = createWidget({
    component: GeometryForms,
    reducer: null,
    name: "Geometry",
    options: [
        {
            name: "color",
            displayName: "Color",
            fieldType: FieldType.Text,
            defaultValue: "white",
        },
        {
            name: "testCheckbox",
            displayName: "Checkbox",
            fieldType: FieldType.Checkbox,
            defaultValue: true,
        },
        {
            name: "shape",
            displayName: "Shape",
            fieldType: FieldType.Select,
            selectOptions: [
                {
                    value: "BoxGeometry",
                    name: "Cube",
                },
                {
                    value: "PlaneGeometry",
                    name: "Plane",
                },
            ],
            defaultValue: "BoxGeometry",
        },
    ],
});
