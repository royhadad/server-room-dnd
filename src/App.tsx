import serverRackIcon from "./assets/server-rack-icon.svg";
import "./App.css";
import { css } from "@emotion/react";

function App() {
  return (
    <div>
      <h1
        css={css`
          font-size: 5rem;
        `}
      >
        hello world!
      </h1>
      <div>
        <img
          src={serverRackIcon}
          alt="Server Rack"
          css={css`
            width: 100px;
            height: 100px;
          `}
        />
      </div>
    </div>
  );
}

export default App;
