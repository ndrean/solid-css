import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import BauSolidCss from "/bau-solidcss";
// import BauSolidCss from "../src/bau-solidcss";

import Logo from "./logo";
import { BasicBtn, StBtn, CondStBtn } from "./button.jsx";

const { css, keyframes, styled, createGlobalStyles } = BauSolidCss();

createGlobalStyles`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const headerCL = css`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const AnimSurf = (props) => styled("span", props)`
  font-size: ${props.size ?? 1}em;
  animation: ${rescale} 2s ease infinite;
`;

const rescale = keyframes`
0% {transform: scale(0.5)}
100% {transform: scale(1)}
`;

const rotate = keyframes`
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
`;

const animated = css`
  border: orange dotted 1px;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    animation: ${rotate} 4s infinite;
  }
`;

const P = (props) => styled("p", props)`
  color: midnightblue;
  background-color: bisque;
  font-size: 1em;
`;

const other = css`
  font-size: 1em;
  color: grey;
  &:hover {
    padding: 0.5em;
  }
`;

const Dyn = (props) => {
  const size = () => props.size || 1;
  return (
    <div style={{ "font-size": `${size()}` + "em" }}>{props.children}</div>
  );
};

const App = () => {
  const [size, setSize] = createSignal(1);

  return (
    <div>
      <section class={headerCL}>
        <P class={other}>
          This is a styled component. You can extend the base class rules but
          not overwrite them.
        </P>
        <br />
        <p>Conditional Classes</p>
        <BasicBtn onClick={() => alert("hi")}>Base style</BasicBtn>
        <br />
        <StBtn danger="true" onClick={() => alert("danger")}>
          Conditional v1
        </StBtn>
        <br />
        <CondStBtn>Base</CondStBtn>
        <CondStBtn
          disabled
          size={1.2}
          class={css`
            box-shadow: 6px -6px teal;
          `}
        >
          Conditional v2 disabled
        </CondStBtn>
        <br />
        <CondStBtn
          class={css`
            box-shadow: 6px -6px bisque;
          `}
          danger="true"
          size={2}
          onClick={() => alert(2)}
        >
          Conditional v2 danger
        </CondStBtn>
        <br />
        <input
          type="range"
          min={1}
          max={3}
          step={0.2}
          value={size()}
          onchange={(e) => setSize(e.target.value)}
        />

        <Dyn size={size()}>Dynamic</Dyn>

        <figure>
          <Logo size={100} />
          <figcaption>CSS-in-JS</figcaption>
        </figure>
        <AnimSurf size={2}>🏄</AnimSurf>
        <h2 class={animated}>What else?</h2>
      </section>
    </div>
  );
};

render(() => App(), root);
