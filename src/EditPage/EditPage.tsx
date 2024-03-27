import React, { useState } from "react";
import { css } from "@emotion/react";
import { Canvas } from "./Canvas.tsx";
import { Toolbar } from "./Toolbar.tsx";
import serverRackIcon from "../assets/server-rack-icon.svg";

type Tool = {
  id: string;
  name: string;
  icon: string;
};

const tools: Tool[] = [
  {
    id: "cabinet",
    name: "Cabinet",
    icon: serverRackIcon,
  },
] as const;

type Entity = {
  toolId: string;
  position: { x: number; y: number }; // the top-left corner of the entity
  // dimensions: { width: number; height: number }; // TODO: add this later
};

export const EditPage: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);

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
