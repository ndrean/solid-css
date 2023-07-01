import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import SolidCss from "./solidcss";

import logo from "./logo.svg";
import styles from "./App.module.css";

const { css, styled, keyframes } = SolidCss();

const Redh2 = (props) => styled("h2")(props)`
color: ${props.color};
font-size: "2em";
`;

const Greenp = (props) => styled("p")(props)`
  color: ${props.color};
  font-size: "2em";
`;

const surf = "🏄";

// const Surf = (props) => {
//   const size = () => props.size;
//   return <span style={{ "font-size": size() + "px" }}>{props.children}</span>;
// };

const ASurf = (props) => styled("span")(props)`
  font-size: ${props.size}px;
  animation: ${rescale} 2s ease infinite;
`;

const BtnClass = ({ color, size }) => css`
  border-radius: 6px;
  background-color: teal;
  color: ${color};
  font-size: ${size};
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    animation: ${rotate} 4s infinite;
  }
`;

function App(props) {
  // const [size, setSize] = createSignal(20);
  // setInterval(() => setSize((s) => (s + 1) % 200), 20);

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <Surf size={size()}>🏄</Surf> */}
        <ASurf size={50}>🏄</ASurf>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <h2 class={animated}>What else?</h2>
        <button class={BtnClass({ color: "red", size: "3em" })}>
          Click me
        </button>
        <Redh2 size="2em" color="red">
          Styled!
        </Redh2>
        <Greenp color="green">Hola</Greenp>
      </header>
    </div>
  );
}

export default App;
