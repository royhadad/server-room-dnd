import { css } from "@emotion/react";
import serverRackIcon from "../assets/server-rack-icon.svg";
import { Tooltip } from "@mui/material";

const Toolbar: React.FC = () => {
  return (
    <div>
      <h2>Items</h2>
      <ul
        css={css`
          width: 300px;
        `}
      >
        <li>
          <DraggableItem
            id={"server"}
            name={"server-icon"}
            image={serverRackIcon}
          />
        </li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

interface DraggableItemProps {
  id: string;
  name: string;
  image: string;
}
const DraggableItem: React.FC<DraggableItemProps> = (props) => {
  return (
    <Tooltip title={props.name} placement="top">
      <div>
        <img
          src={props.image}
          alt={props.name}
          css={css`
            width: 100px;
            height: 100px;
          `}
        />
      </div>
    </Tooltip>
  );
};
