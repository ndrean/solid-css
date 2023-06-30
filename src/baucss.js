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

export default function BauCss({
  document = window.document,
  target = document.head,
} = {}) {
  //   const styled =
  //     (tagName) =>
  //     (strings, ...args) => {
  //       const className = doIt((name, compiled) => `.${name} { ${compiled} }`)(
  //         strings,
  //         ...args
  //       );
  //       const element = document.createElement(tagName);
  //       element.classList.add(className);
  //       return element;
  //     };

  const styled =
    (tagName) =>
    (takeProps) =>
    (strings, ...args) => {
      const className = doIt((name, compiled) => `.${name} { ${compiled} }`)(
        strings,
        ...args
      );
      const element = document.createElement(tagName);
      element.classList.add(className);
      element.innerHTML = takeProps.children;
      return element;
    };

  const doIt =
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
    css: doIt((className, compiled) => `.${className} { ${compiled} }`),
    keyframes: doIt((name, compiled) => `@keyframes ${name} { ${compiled} }`),
    createGlobalStyles: doIt((name, compiled) => compiled),
  };
}
