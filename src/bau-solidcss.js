import { mergeProps, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

const classNames = (...cn) => [...cn].join(" ");

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

const merge = (type, compiled, target) => {
  const name = toHash(compiled);
  if (!document.getElementById(name)) {
    type
      ? addStyle(target, name, `${type}${name} { ${compiled}}`)
      : addStyle(target, name, compiled);
  }
  return name;
};

const compileStyles = (rest, strings, args) =>
  strings.reduce((acc, value, i) => {
    if (typeof args[i] !== "object") {
      return acc + value + (args[i] ?? "");
    } else {
      const otherProps = Object.keys(rest).filter(
        (k) => typeof rest[k] !== "function" && rest[k]
      );
      const condCss = Object.entries(args[i]).reduce((accn, [k, v]) => {
        return otherProps.includes(k) ? accn + v : accn;
      }, "");
      return acc + value + condCss;
    }
  }, "");

export default function BauSolidCss({
  document = window.document,
  target = document.head,
} = {}) {
  const styled =
    (tag, props) =>
    (strings, ...args) => {
      const [propClass, rest] = splitProps(props, ["class"]);
      const compiledStyles = compileStyles(rest, strings, args);
      const name = merge(".", compiledStyles, target);

      return Dynamic(
        mergeProps({
          component: tag,
          // additional class in the component: doesn't overwrite
          class: classNames(name, propClass.class),
          // pass in the props: children, listeners, attributes...
          ...rest,
        })
      );
    };

  const mergeIt =
    (type) =>
    (strings, ...args) =>
      merge(type, compileStyles("", strings, args), target);

  return {
    styled,
    css: mergeIt("."),
    keyframes: mergeIt("@keyframes "),
    createGlobalStyles: mergeIt(),
  };
}
