import { render } from "solid-js/web";
import { createSignal } from "solid-js";
import SolidCss from "../src/solidcss";

import Logo from "./logo";
import Hamburger from "./hamburger";

const { css, keyframes, styled, createGlobalStyles } = SolidCss();

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
  font-size: ${props.size}em;
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
  font-size: 4em;
`;

const other = `
  color: grey;
  &:hover {
    padding: 0.1em;
  }
`;

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
          class overwrite: must pass the CSS string
        </P>
      </D>
      <br />
      <section class={headerCL}>
        <input
          type="range"
          min={1}
          max={2}
          step={0.2}
          value={size()}
          onchange={(e) => setSize(e.target.value)}
        />
        <Hamburger color="bisque" size={size() * 40} />
        <figure>
          <Logo size={100} />
          <figcaption>CSS-in-JS</figcaption>
        </figure>
        <AnimSurf size={size()}>🏄</AnimSurf>
        <h2 class={animated}>What else?</h2>
      </section>
    </div>
  );
};

render(() => App(), root);
