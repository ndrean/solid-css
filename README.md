# CSS-in-JS for SolidJS

Shamlessly copied BauCSS, added `styled` for SolidJS.
[![npm bundle size](https://img.badgesize.io/ndrean/solid-css/main/src/bau-solidcss.js?compression=gzip)](https://bundlephobia.com/package/bau-solidcss@0.1.10)

## Usage

```bash
pnpm i bau-solidcss
```

```js
import BauSolidCss from "bau-solidcss";
const { css, styled, keyframes, createGlobalStyles } = BauSolidCss();
```

## Worked example

```bash
cd example
pnpm i
pnpm run dev
```

## `bau-solidcss` package

It exports 4 primitives: `css`to build classes, `keyframes` to build animations, `createGlobalStyles` for global styles and `styled` to build styled components and easy conditional styling.

### Global style with `createGlobalStyles`

```js
createGlobalStyles`
  :root {
    margin: 0;
    --main-color: midnightblue;
  }
  
  body {
    text-align: center;
  }
`;
```

### Build a class with `css`

You write template strings, pass it to the function `css` to build a `class`.

```js
const main = css`
  background-color: bisque;
  color: var(--main-color);
`;

<div class={main}>I am an div</div>;
```

### Build a styled component with `styled`

```js
const P = (props) => styled("p", props)`
  color: ${props.color ?? "var(--main-color)"};
`;

<P>I am blue</P>
<P color="red">I am red</P>;
```

### Add rules to a styled component

Yo ucan extend rules, not overwrite them. To overwrite them, use the conditional form with props, see below.

```js
const B = (props) => (
  <P
    color="midnightblue"
    class={css`
      background-color: bisque;
    `}
  >
    {props.children}
  </P>
);

<B> A bisqued "P"</B>;
```

### Conditional classes

Take CSS rules in the form of the object below:

```js
const styles = (props) => {
  base: `
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
    opacity: ${props.opacity};
  `;
}
```

You can do:

```js
const Btn = (props) =>
  styled("button", props)`
    ${styles(props).root +
    (props.danger ? styles(props).danger : "") +
    (props.disabled ? styles(props).disabled : "")}
  `;
```

Alternatively, when you use the boject above, then the `styled` primitive merges the styles from the props. In other words, with:

```jsx
const Button = (props) => styled("button", props)`
  ${styles(props).base}
  ${styles(props)}
`;
```

you can do:

```jsx
// the 1st version:
<Btn size={2} onClick={()=> alert('hi')}>Base size 2</Btn>
<Btn danger="true">Danger</Btn>

//or the second version
<Button>Base Button</Button>
<Button
  danger="true"
  disabled
  size={1.5}
  className={css`
    box-shadow: 6px -6px bisque;
  `}
>
  Shadowed Danger
</Button>;
```

### Reactive style of a component

```js
const [size, setSize] = createSignal(1)


const Dyn = (props) => {
  const size = () => props.size || 1;
  return (
    <div style={{ "font-size": `${size()}em` }}>{props.children}</div>
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

const AnimSurf = (props) => styled("span", props)`
  font-size: ${props.size}em;
  animation: ${rescale} 2s ease infinite;
`;

<AnimSurf size={3}>🏄</AnimSurf>;
```
