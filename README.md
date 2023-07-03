# CSS-in-JS for SolidJS

Shamlessly copied from BauCSS, added `styled` for SolidJS

## Usage

```bash
npm i solidcss
```

```js
import SolidCss from "solidcss";
const { css, styled, keyframes } = SolidCss();
```

## Worked example

<https://githubbox.com/ndrean/solid-css/blob/main/example/App.jsx>

## `solidcss` package

It exports `css`to build classes, `keyframes` to build animations, `createGlobalStyles` for global styles and `styled` to build styled components.

### Build a class with `css`

```js
const bluediv = css`
  background-color: bisque;
  color: midnightblue;
`;

<div class={rediv}>I am blue</div>;
```

- build a styled component with `styled`:

```js
const P = (props) => styled("p", props)`
  color: ${props.color} ?? teal;
`;

<P color="red">I am red</P>;
```

### Overwrite the style of "styled components"

```js
const Biskred = (props) => (
  <P
    color="midnightblue"
    class={css`
      background-color: bisque;
    `}
  >
    {props.children}
  </P>
);
```

### Conditional classes

```js
const styles = (props) => ({
  root: `color: dodgerblue; cursor: pointer; font-size: ${props.size ?? 1}em;`,
  danger: `color: red;`,
  disabled: `pointer-events: none; opacity: 0.5;`,
});

const Btn = (props) =>
  styled("button", props)`
    ${styles(props).root +
    (props.danger ? styles(props).danger : "") +
    (props.disabled ? styles(props).disabled : "")}
  `;

// usage:
<Btn size={2} onClick={()=> alert('hi')}>Base</Btn>
<Btn danger>Danger</Btn>
<Btn danger disabled size={3}>
  Danger disabled
</Btn>
```

### Reactive style of a component

```js
const [size, setSize] = createSignal(1)


const Dyn = (props) => {
  const size = () => props.size || 1;
  return (
    <div style={{ "font-size": `${size()}` + "em" }}>{props.children}</div>
  );
};

<input type="number" value={size()} onchange={e => setSize(e.target.value)} />
<Dyn size={size()}>Dynamic</Dyn>
```

### Animations with `keyframes`

```js
const rescale = keyframes`
0% {transform: scale(0.5)}
100% {transform: scale(1)}
`;

const AnimSurf = (props) => styled("span")(props)`
  font-size: ${props.size}em;
  animation: ${rescale} 2s ease infinite;
`;

<AnimSurf size={3}>🏄</AnimSurf>;
```

### Global style with `createGlobalStyles`
