import { css } from "@emotion/react";
import React from "react";

interface CanvasProps {
  selectedToolId: string | null;
}

export const Canvas: React.FC<CanvasProps> = () => {
  return (
    <div
      css={css`
        border: 3px solid green;
        overflow: hidden;
      `}
    >
      <CanvasDotsGrid />
    </div>
  );
};

// extracted the inner grid to memoize the rendering, due to a real life *measured* performance problem

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
