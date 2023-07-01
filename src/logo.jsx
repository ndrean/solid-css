import SolidCss from "./solidcss";
import logo from "./logo.svg";
const { css, keyframes } = SolidCss();

const logoSpin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }`;

const logoCss = css`
  animation: ${logoSpin} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

export default (props) => (
  <img
    src={logo}
    height={props.size}
    width={props.size}
    class={logoCss}
    alt="logo"
  />
);
