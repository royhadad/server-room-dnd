import { css } from "@emotion/react";
import React from "react";
import { Entity, EntityTypeId, entityTypes, Position } from "./EditPage.tsx";
import {
  DndContext,
  MouseSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface CanvasProps {
  selectedToolId: EntityTypeId | null;
  placeEntity: (entityTypeId: EntityTypeId, position: Position) => void;
  entities: Entity[];
  setEntities: React.Dispatch<React.SetStateAction<Entity[]>>;
}

const CANVAS_ID = "server_room_canvas_element_id";

function roundToTheNearest10(value: number): number {
  const ROUNDING_VALUE = 10;
  return Math.round(value / ROUNDING_VALUE) * ROUNDING_VALUE;
}

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { entities, placeEntity, selectedToolId, setEntities } = props;

  const onCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (selectedToolId === null) {
      return;
    }
    const canvasElement = document.getElementById(CANVAS_ID);
    if (!canvasElement) {
      return;
    }

    const canvasRect = canvasElement.getBoundingClientRect();
    const positionRelativeToCanvas: Position = {
      x: roundToTheNearest10(event.clientX - canvasRect.left),
      y: roundToTheNearest10(event.clientY - canvasRect.top),
    };
    placeEntity(selectedToolId, positionRelativeToCanvas);
  };

  const { setNodeRef } = useDroppable({
    id: CANVAS_ID,
  });

  const mouseSensor = useSensor(MouseSensor, {});
  const sensors = useSensors(mouseSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={(event) => {
        const currentEntity = event.active.data?.current?.entity as Entity;
        setEntities((prevEntities) => {
          const newEntities = [...prevEntities];
          const entityIndex = newEntities.findIndex(
            (entity) => entity.entityUniqueId === currentEntity.entityUniqueId,
          );
          if (entityIndex === -1) {
            return prevEntities;
          }
          newEntities[entityIndex] = {
            ...newEntities[entityIndex],
            position: {
              x: roundToTheNearest10(currentEntity.position.x + event.delta.x),
              y: roundToTheNearest10(currentEntity.position.y + event.delta.y),
            },
          };
          return newEntities;
        });
      }}
    >
      <div
        ref={setNodeRef}
        id={CANVAS_ID}
        css={css`
          border: 3px solid green;
          overflow: hidden;
          position: relative; // ancestor has position: relative, so all absolute positioned children are relative to this
          width: 100%;
          height: 100%;
        `}
        onClick={onCanvasClick}
      >
        <CanvasDotsGrid />
        {entities.map((entity, index) => {
          // TODO: change key to something other than index
          return <DraggableEntity key={index} entity={entity} />;
        })}
      </div>
    </DndContext>
  );
};

const DraggableEntity: React.FC<{ entity: Entity }> = ({ entity }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: entity.entityUniqueId,
    data: { entity },
  });
  console.log(transform);
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const entityType = entityTypes[entity.toolId];
  const width = 80; // TODO: make those dynamic later
  const height = 80;

  return (
    <div
      ref={setNodeRef}
      css={css`
        position: absolute;
        left: ${entity.position.x}px;
        top: ${entity.position.y}px;
        width: ${width}px;
        height: ${height}px;
      `}
      style={style}
      {...listeners}
      {...attributes}
    >
      <img src={entityType.icon} alt={entityType.icon} />
    </div>
  );
};

const GAP_BETWEEN_DOTS_IN_PIXELS = 40;
const DOT_RADIUS_IN_PIXELS = 2.5;

const CanvasDotsGridWithoutMemo: React.FC = () => {
  return (
    <div
      css={css`
        overflow: auto;
      `}
    >
      <svg width="100%" height="1000px">
        <pattern
          id="pattern-circles"
          x="0"
          y="0"
          width={GAP_BETWEEN_DOTS_IN_PIXELS}
          height={GAP_BETWEEN_DOTS_IN_PIXELS}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            id="pattern-circle"
            cx={GAP_BETWEEN_DOTS_IN_PIXELS / 2}
            cy={GAP_BETWEEN_DOTS_IN_PIXELS / 2}
            r={DOT_RADIUS_IN_PIXELS}
            fill="#999999"
          ></circle>
        </pattern>

        <rect
          id="rect"
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#pattern-circles)"
        ></rect>
      </svg>
    </div>
  );
};

const CanvasDotsGrid = React.memo(CanvasDotsGridWithoutMemo);
