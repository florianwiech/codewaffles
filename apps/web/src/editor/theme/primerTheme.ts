import { EditorView } from "@codemirror/view";
import { Extension } from "@codemirror/state";
import { HighlightStyle, tags as t, TagStyle } from "@codemirror/highlight";
import dark from "@primer/primitives/dist/js/colors/dark";
import light from "@primer/primitives/dist/js/colors/light";
import { StyleSpec } from "style-mod";

export type ThemeSpec = {
  [selector: string]: StyleSpec;
};

export type PrimerThemeSpecParams = {
  name: string;
  theme: typeof light;
};

const getPrimerThemeSpec = ({ name, theme }: PrimerThemeSpecParams): ThemeSpec => {
  const themes = (options: StyleSpec) => options[name];

  return {
    "&": {
      color: theme.codemirror.text,
      backgroundColor: theme.codemirror.bg,
    },

    ".cm-content": {
      caretColor: theme.codemirror.cursor,
    },

    "&.cm-focused .cm-cursor": {
      borderLeftColor: theme.accent.fg,
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: theme.codemirror.selectionBg,
    },

    ".cm-panels": {
      backgroundColor: theme.codemirror.bg,
      color: theme.codemirror.text,
    },
    ".cm-panels.cm-panels-top": {
      borderBottom: `1px solid ${theme.border.default}`,
    },
    ".cm-panels.cm-panels-bottom": {
      borderTop: `1px solid ${theme.border.default}`,
    },

    ".cm-searchMatch": {
      backgroundColor: themes({ light: "#34d05840", dark: "#17E5E633" }),
      outline: `1px solid ${themes({ light: "#34d05800", dark: "#17E5E600" })}`,
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: themes({ light: "#0366d611", dark: "#3392FF22" }),
    },

    ".cm-activeLine": {
      backgroundColor: theme.codemirror.activelineBg,
    },
    ".cm-selectionMatch": {
      backgroundColor: theme.codemirror.selectionBg,
    },

    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: themes({ light: "#34d05840", dark: "#17E5E650" }),
      padding: "1px 0",
      outline: `1px solid ${themes({ light: "#34d05800", dark: "#17E5E600" })}`,
      borderRadius: "2px",
    },

    ".cm-gutters": {
      backgroundColor: theme.codemirror.guttersBg,
      color: theme.codemirror.linenumberText,
      border: "none",
      borderRight: `1px solid ${theme.border.subtle}`,
      userSelect: "none",
    },

    ".cm-activeLineGutter": {
      backgroundColor: theme.codemirror.activelineBg,
      color: theme.fg.default,
    },

    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: theme.fg.muted,
    },

    ".cm-tooltip": {
      color: theme.fg.default,
      backgroundColor: theme.canvas.overlay,
      border: `1px solid ${theme.border.default}`,
      padding: "4px",
      borderRadius: "6px",
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: theme.border.default,
      borderBottomColor: theme.border.default,
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li": {
        padding: "2px",
      },

      "& > ul > li[aria-selected]": {
        backgroundColor: theme.neutral.muted,
        color: theme.fg.default,
        borderRadius: "4px",
      },
    },

    ".cm-tooltip-cursor": {
      color: theme.fg.onEmphasis,
      backgroundColor: theme.neutral.emphasisPlus,
      border: `1px solid ${theme.neutral.emphasisPlus}`,
      padding: "2px 6px",
    },
    ".cm-tooltip-cursor .cm-tooltip-arrow:after": {
      borderTopColor: theme.neutral.emphasisPlus,
      borderBottomColor: theme.neutral.emphasisPlus,
    },
  };
};

const getPrimerHighlightSpecs = ({ name, theme }: PrimerThemeSpecParams): TagStyle[] => {
  const themes = (options: StyleSpec) => options[name];
  const { scale } = theme;

  return [
    {
      tag: t.keyword,
      color: themes({ light: scale.red[5], dark: scale.red[3] }),
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: themes({ light: scale.blue[6], dark: scale.blue[2] }),
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: themes({ light: scale.purple[5], dark: scale.purple[2] }),
    },
    // {
    //   tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    //   color: themes({ light: scale.blue[6], dark: scale.blue[2] }),
    // },
    {
      tag: [t.definition(t.name), t.separator],
      color: themes({ light: scale.blue[6], dark: scale.blue[2] }),
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: themes({ light: scale.blue[8], dark: scale.blue[1] }),
    },
    {
      tag: [t.meta, t.comment],
      color: themes({ light: scale.gray[5], dark: scale.gray[3] }),
    },
    {
      tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: themes({ light: scale.red[5], dark: scale.red[3] }),
    },
    {
      tag: t.heading,
      fontWeight: "bold",
      color: themes({ light: scale.blue[6], dark: scale.blue[2] }),
    },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    {
      tag: t.link,
      color: themes({ light: scale.blue[8], dark: scale.blue[1] }),
      textDecoration: "underline",
    },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: themes({ light: scale.blue[8], dark: scale.blue[1] }),
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: themes({ light: scale.blue[6], dark: scale.blue[2] }),
    },
    {
      tag: t.invalid,
      color: themes({ light: scale.red[7], dark: scale.red[2] }),
    },
  ];
};

const primerLightHighlightStyle = HighlightStyle.define(getPrimerHighlightSpecs({ name: "light", theme: light }));
const primerDarkHighlightStyle = HighlightStyle.define(getPrimerHighlightSpecs({ name: "dark", theme: dark }));

const primerLightTheme = EditorView.theme(getPrimerThemeSpec({ name: "light", theme: light }), { dark: false });
const primerDarkTheme = EditorView.theme(getPrimerThemeSpec({ name: "dark", theme: dark }), { dark: true });

export const primerLight: Extension = [primerLightTheme, primerLightHighlightStyle];
export const primerDark: Extension = [primerDarkTheme, primerDarkHighlightStyle];
