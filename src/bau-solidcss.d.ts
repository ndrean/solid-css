export default function BauSolidCss(input?: {
    document?: Document;
    target?: HTMLElement;
  }): {
    styled: (string, any) => HTMLElement;
    css: (any) => string;
    keyframes: (any) => string;
    createGlobalStyles: (any) => any;
  };
  