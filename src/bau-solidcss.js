import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const toHash = (str) => {
  let i = 0,
    out = 11;
  while (i < str.length) out = (101 * out + str.charCodeAt(i++)) >>> 0;
  return "bau" + out;
};

const addStyle = (target, className, cssText) => {
  const style = document.createElement("style");
  style.id = className;
  style.append(cssText);
  target.append(style);
};

const compile = (strings, args) =>
  strings.reduce((acc, value, i) => acc + value + (args[i] ?? ""), "");

export default function BauSolidCss({
  document = window.document,
  target = document.head,
} = {}) {
  const styled =
    (tag, props) =>
    (strings, ...args) => {
      const newClass = classIt((name, compiled) => `.${name} { ${compiled} }`)(
        strings,
        ...args
      );
      const [propClass, rest] = splitProps(props, ["class"]);
      return Dynamic(
        mergeProps({
          component: tag,
          // overwrite CSS with a new css string in the component
          classList: { [newClass]: true, [propClass?.class]: true },
          // pass in the props: children, listeners, attributes...
          ...rest,
        })
      );
    };

  const classIt =
    (styleMake) =>
    (strings, ...args) => {
      const compiled = compile(strings, args);
      const name = toHash(compiled);
      !document.getElementById(name) &&
        addStyle(target, name, styleMake(name, compiled));
      return name;
    };

  return {
    styled,
    css: classIt((className, compiled) => `.${className} { ${compiled} }`),
    keyframes: classIt(
      (name, compiled) => `@keyframes ${name} { ${compiled} }`
    ),
    createGlobalStyles: classIt((name, compiled) => compiled),
  };
}
