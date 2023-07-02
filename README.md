# CSS-in-JS for SolidJS

Shamlessly copied from BauCSS, added `styled` for SolidJS

## Usage

```js
import SolidCss from "solidcss";
const { css, styled, keyframes } = SolidCss();
```

- build a class with `css`

```js
const rediv = css`
  border-radius: 4px;
  color: blue;
`;

<div class={rediv}>...</div>;
```

- build a styled component with `styled`:

```js
const Red = (props) => styled("p")(props)`
    color: ${props.color};
`;

<Red color="red">I am red</Red>;
```

- animations with `keyframes`:

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
