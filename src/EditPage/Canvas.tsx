import { css } from "@emotion/react";
import React from "react";

interface CanvasProps {
  selectedToolId: string | null;
}

const NUMBER_OF_DOTS = 100;
const GAP_BETWEEN_DOTS_IN_PIXELS = 40;
const arrayOfLength100 = Array.from({ length: NUMBER_OF_DOTS });

export const Canvas: React.FC<CanvasProps> = () => {
  return (
    <div
      css={css`
        border: 3px solid green;
        overflow: hidden;
      `}
    >
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
        {arrayOfLength100.map((_, rowIndex) => (
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
            {arrayOfLength100.map((_, columnIndex) => (
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
    </div>
  );
};
