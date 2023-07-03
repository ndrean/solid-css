import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import BauSolidCss from "../src/bau-solidcss";

import Logo from "./logo";

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

const D = (props) => styled("div", props)`
  text-align: center;
`;
const P = (props) => styled("p", props)`
  color: midnightblue;
  background-color: bisque;
  font-size: 2em;
`;

const other = `
  font-size: 1em;
  color: grey;
  &:hover {
    padding: 0.5em;
  }
`;

const styles = (props) => ({
  root: `
    color: dodgerblue; 
    cursor: pointer; 
    font-size: ${props.size ?? 1}em; 
    border-radius: 0.2em;
    padding: 0.2em;
  `,
  danger: `
    color: red;
    animation: ${rescale} 1s ease infinite;
  `,
  disabled: `
    pointer-events: none; 
    opacity: 0.5;
  `,
});

const Btn = (props) =>
  styled("button", props)`
    ${styles(props).root +
    (props.danger ? styles(props).danger : "") +
    (props.disabled ? styles(props).disabled : "")}
  `;

const Dyn = (props) => {
  const size = () => props.size || 1;
  return (
    <div style={{ "font-size": `${size()}` + "em" }}>{props.children}</div>
  );
};

const App = () => {
  const [size, setSize] = createSignal(2);

  return (
    <div>
      <D>
        <P>base class</P>
        <P
          class={css`
            ${other}
          `}
        >
          Overwrite CSS of Styled component: must pass the CSS string
        </P>
      </D>
      <br />
      <Btn
        class={css`
          background-color: bisque;
        `}
        onClick={() => window.alert("hi")}
      >
        Base click
      </Btn>

      <Btn danger size={1.5} onClick={() => alert("danger")}>
        Danger click
      </Btn>
      <Btn danger disabled size={1.5}>
        Danger disabled
      </Btn>
      <section class={headerCL}>
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
        <AnimSurf>🏄</AnimSurf>
        <AnimSurf size={2}>🏄</AnimSurf>
        <h2 class={animated}>What else?</h2>
      </section>
    </div>
  );
};

render(() => App(), root);
