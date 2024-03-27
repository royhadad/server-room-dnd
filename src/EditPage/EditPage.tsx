import React, { useState } from "react";
import { css } from "@emotion/react";
import { Canvas } from "./Canvas.tsx";
import { Toolbar } from "./Toolbar.tsx";

export const EditPage: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

  return (
    <div
      css={css`
        border: 3px solid red;
        width: 100%;
        height: 100%;
        display: flex;
      `}
    >
      <Toolbar
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <Canvas selectedToolId={selectedToolId} />
    </div>
  );
};
