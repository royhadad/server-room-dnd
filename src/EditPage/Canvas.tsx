import { css } from "@emotion/react";

export const Canvas: React.FC = () => {
  return (
    <div
      css={css`
        border: 3px solid green;
        flex-grow: 1;
      `}
    >
      Canvas
    </div>
  );
};
