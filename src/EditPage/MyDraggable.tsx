import {
  KeyboardSensor,
  Modifiers,
  MouseSensor,
  PointerActivationConstraint,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Coordinates } from "@dnd-kit/utilities";
import { DndContext } from "@dnd-kit/core";

const defaultCoordinates = {
  x: 0,
  y: 0,
};
export const MyDndContext: React.FC<
  React.PropsWithChildren<{
    activationConstraint?: PointerActivationConstraint;
    modifiers?: Modifiers;
  }>
> = ({ children, activationConstraint, modifiers }) => {
  const [{ x, y }, setCoordinates] = useState<Coordinates>(defaultCoordinates);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
      modifiers={modifiers}
    >
      {children}
    </DndContext>
  );
};
