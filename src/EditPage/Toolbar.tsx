import React from "react";
import { css } from "@emotion/react";
import serverRackIcon from "../assets/server-rack-icon.svg";
import { Tooltip, Button } from "@mui/material";

export const Toolbar: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = React.useState<string>("server");

  return (
    <div
      css={css`
        border: 3px solid purple;
        width: 10vw;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      `}
    >
      <ToolItem
        id={"full-cabinet"}
        name={"Full Cabinet"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <ToolItem
        id={"half-cabinet"}
        name={"Half Cabinet"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <ToolItem
        id={"quarter-cabinet"}
        name={"Quarter Cabinet"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <ToolItem
        id={"wall"}
        name={"Wall"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <ToolItem
        id={"window"}
        name={"Window"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
      <ToolItem
        id={"door"}
        name={"Door"}
        icon={serverRackIcon}
        selectedToolId={selectedToolId}
        setSelectedToolId={setSelectedToolId}
      />
    </div>
  );
};

interface ToolItemProps {
  id: string;
  name: string;
  icon: string;
  selectedToolId: string;
  setSelectedToolId: (toolId: string) => void;
}
const ToolItem: React.FC<ToolItemProps> = (props) => {
  const isSelected = props.id === props.selectedToolId;

  return (
    <Tooltip title={props.name} placement="right">
      <Button
        css={css`
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 0;
          background: ${isSelected ? "#d2d2d2" : "initial"};
          &.MuiButton-root:hover {
            ${isSelected ? "background-color: #d2d2d2;" : ""}
          }
        `}
        onClick={() => props.setSelectedToolId(props.id)}
      >
        <img
          src={props.icon}
          alt={props.name}
          css={css`
            width: 65%;
            padding: 12px;
          `}
        />
        <p>{props.name}</p>
      </Button>
    </Tooltip>
  );
};
