// import SolidCss from "./solidcss";

import logo from "./logo.svg";
import styles from "./App.module.css";
import SolidCss from "./solidcss";
import LogoSVG from "./logoSVG";
import Logo from "./logo";
const { css, keyframes, styled } = SolidCss();

const AnimSurf = (props) => styled("span")(props)`
  font-size: ${props.size}px;
  animation: ${rescale} 2s ease infinite;
`;

const rescale = keyframes`
0% {transform: scale(0.5)}
100% {transform: scale(1)}
`;

const btn = ({ color, size }) => css`
  border-radius: 10px;
  background-color: bisque;
  color: ${color};
  font-size: ${size};
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

const Btn1 = (props) => styled("button")(props)`
  font-size: ${props.size}em;
`;

const Icon = (props) => styled("span")(props)`
  display: flex;
  flex: 1;
  color: red;
  font-size: 4em;
`;

const Btn3 = (props) => styled("button")(props)`
  background: dodgerblue;
  color: white;
  border: ${Math.random()}px solid white;

  &:focus,
  &:hover {
    padding: 2em;
  }

  .otherClass {
    margin: 0;
  }
`;

function App() {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <AnimSurf size={100}>🏄</AnimSurf>
        <figure>
          <img
            src={logo}
            class={styles.logo}
            alt="logo"
            height={50}
            width={50}
          />
          <figcaption>Class: "styles.logo"</figcaption>
        </figure>

        <figure>
          <Logo size={50} />
          <figcaption>Class: CSS-in-JS</figcaption>
        </figure>
        <hr />
        <h2 class={animated}>What else?</h2>
        <button class={btn({ color: "midnightblue", size: "2em" })}>
          Click me
        </button>
        <Btn1 size={4}>
          <span>Is this 4em?</span>
        </Btn1>

        <Btn3>
          <Icon>Inside?</Icon>
          <Icon>Outside?</Icon>
        </Btn3>
      </header>
    </div>
  );
}

export default App;
