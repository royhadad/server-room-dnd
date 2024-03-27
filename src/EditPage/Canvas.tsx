import { css } from "@emotion/react";
import React from "react";
import { Entity, EntityTypeId, entityTypes, Position } from "./EditPage.tsx";

interface CanvasProps {
  selectedToolId: EntityTypeId | null;
  placeEntity: (entityTypeId: EntityTypeId, position: Position) => void;
  entities: Entity[];
}

const CANVAS_ID = "server_room_canvas_element_id";

function roundToTheNearest10(value: number): number {
  return Math.round(value / 10) * 10;
}

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { entities, placeEntity, selectedToolId } = props;

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

  return (
    <div
      id={CANVAS_ID}
      css={css`
        border: 3px solid green;
        overflow: hidden;
        position: relative; // ancestor has position: relative, so all absolute positioned children are relative to this
      `}
      onClick={onCanvasClick}
    >
      <CanvasDotsGrid />
      {entities.map((entity, index) => {
        // TODO: change key to something other than index
        return <DraggableEntity key={index} entity={entity} />;
      })}
    </div>
  );
};

const DraggableEntity: React.FC<{ entity: Entity }> = ({ entity }) => {
  const entityType = entityTypes[entity.toolId];
  const width = 80; // TODO: make those dynamic later
  const height = 80;

  return (
    <div
      css={css`
        position: absolute;
        left: ${entity.position.x - width / 2}px;
        top: ${entity.position.y - height / 2}px;
        width: ${width}px;
        height: ${height}px;
      `}
    >
      <img src={entityType.icon} alt={entityType.icon} />
    </div>
  );
};

// extracted the inner grid to memoize the rendering, due to a real life *measured* performance problem
// TODO: change this to an SVG or something else instead of an array of divs, for an additional performance improvement

const NUMBER_OF_DOTS = 100;
const GAP_BETWEEN_DOTS_IN_PIXELS = 40;
const ARRAY_WITH_LENGTH_NUMBER_OF_DOTS = Array.from({ length: NUMBER_OF_DOTS });

const CanvasDotsGridWithoutMemo: React.FC = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        overflow: auto;
        display: grid;
        grid-template-rows: repeat(
          ${NUMBER_OF_DOTS},
          ${GAP_BETWEEN_DOTS_IN_PIXELS}px
        );
      `}
    >
      {ARRAY_WITH_LENGTH_NUMBER_OF_DOTS.map((_, rowIndex) => (
        <div
          key={rowIndex}
          css={css`
            display: grid;
            grid-template-columns: repeat(
              ${NUMBER_OF_DOTS},
              ${GAP_BETWEEN_DOTS_IN_PIXELS}px
            );
          `}
        >
          {ARRAY_WITH_LENGTH_NUMBER_OF_DOTS.map((_, columnIndex) => (
            <div
              key={columnIndex}
              css={css`
                font-size: 24px;
                color: #999999;
                cursor: default;
                user-select: none;
              `}
            >
              •
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const CanvasDotsGrid = React.memo(CanvasDotsGridWithoutMemo);
