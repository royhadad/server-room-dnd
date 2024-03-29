import React, { useState } from "react";
import { css } from "@emotion/react";
import { Canvas } from "./Canvas.tsx";
import { Toolbar } from "./Toolbar.tsx";
import serverRackIcon from "../assets/server-rack-icon.svg";

type EntityType = {
  id: string;
  name: string;
  icon: string;
};

export type EntityTypeId =
  | "wall"
  | "window"
  | "door"
  | "full-cabinet"
  | "half-cabinet"
  | "quarter-cabinet";

export const entityTypes: Record<EntityTypeId, EntityType> = {
  "full-cabinet": {
    id: "full-cabinet",
    name: "Full Cabinet",
    icon: serverRackIcon,
  },
  "half-cabinet": {
    id: "half-cabinet",
    name: "Half Cabinet",
    icon: serverRackIcon,
  },
  "quarter-cabinet": {
    id: "quarter-cabinet",
    name: "Quarter Cabinet",
    icon: serverRackIcon,
  },
  wall: {
    id: "wall",
    name: "Wall",
    icon: serverRackIcon,
  },
  window: {
    id: "window",
    name: "Window",
    icon: serverRackIcon,
  },
  door: {
    id: "door",
    name: "Door",
    icon: serverRackIcon,
  },
};

export type Entity = {
  entityUniqueId: string;
  toolId: EntityTypeId;
  position: Position; // the top-left corner of the entity
  // dimensions: { width: number; height: number }; // TODO: add this later
};

export type Position = { x: number; y: number };

export const EditPage: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<EntityTypeId | null>(
    null,
  );
  const [entities, setEntities] = useState<Entity[]>([]);

  const placeEntity = (
    entityTypeId: EntityTypeId,
    position: { x: number; y: number },
  ) => {
    setEntities((prevEntities) => [
      ...prevEntities,
      {
        entityUniqueId: Math.random().toString(),
        toolId: entityTypeId,
        position,
      },
    ]);
  };

  // const deleteEntity = (entityIndex: number) => {
  //   setEntities((prevEntities) => {
  //     const newEntities = [...prevEntities];
  //     newEntities.splice(entityIndex, 1);
  //     return newEntities;
  //   });
  // };

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
      <Canvas
        selectedToolId={selectedToolId}
        placeEntity={placeEntity}
        entities={entities}
        setEntities={setEntities}
      />
    </div>
  );
};
