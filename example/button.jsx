// import BauSolidCss from "../src/bau-solidcss";
import BauSolidCss from "bau-solidcss";
// import cln from "../../src/cln.js";

const { styled, css, keyframes } = BauSolidCss();

const rescale = keyframes`
    0% {transform: scale(0.5)}
    100% {transform: scale(1)}
`;

const styles = (props) => ({
  root: `
      color: dodgerblue; 
      cursor: pointer; 
      font-size: ${props.size ?? 1}em; 
      border-radius: 0.3em;
      padding: 0.3em;
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

const StBtn = (props) => styled("button", props)`
  ${styles(props).root +
  (props.danger ? styles(props).danger : "") +
  (props.disabled ? styles(props).disabled : "")}
`;

const CondStBtn = (props) => styled("button", props)`
  ${styles(props).root}
  ${styles(props)}
`;

const BasicBtn = (props) => {
  const { children, ...rest } = props;
  return (
    <button
      className={css`
        ${styles(props).root}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};
export { StBtn, BasicBtn, CondStBtn };
