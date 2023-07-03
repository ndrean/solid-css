import { splitProps as u, mergeProps as y } from "solid-js";
import { Dynamic as f } from "solid-js/web";
const $ = (s) => {
  let c = 0, o = 11;
  for (; c < s.length; )
    o = 101 * o + s.charCodeAt(c++) >>> 0;
  return "bau" + o;
}, h = (s, c, o) => {
  const e = document.createElement("style");
  e.id = c, e.append(o), s.append(e);
}, w = (s, c) => s.reduce((o, e, t) => o + e + (c[t] ?? ""), "");
function S({
  document: s = window.document,
  target: c = s.head
} = {}) {
  const o = (t, n) => (l, ...a) => {
    const r = e((p, i) => `.${p} { ${i} }`)(
      l,
      ...a
    ), [m, d] = u(n, ["class"]);
    return f(
      y({
        component: t,
        classList: { [r]: !0, [m.class]: !0 },
        ...d
      })
    );
  }, e = (t) => (n, ...l) => {
    const a = w(n, l), r = $(a);
    return !s.getElementById(r) && h(c, r, t(r, a)), r;
  };
  return {
    styled: o,
    css: e((t, n) => `.${t} { ${n} }`),
    keyframes: e(
      (t, n) => `@keyframes ${t} { ${n} }`
    ),
    createGlobalStyles: e((t, n) => n)
  };
}
export {
  S as default
};
