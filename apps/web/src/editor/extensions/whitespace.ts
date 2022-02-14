import { Compartment, EditorState, Extension, Facet, StateEffect } from "@codemirror/state";
import { Decoration, MatchDecorator, ViewPlugin } from "@codemirror/view";

const empty: Extension = [];

export const dynamicSetting = Facet.define<DynamicSetting<unknown>>();

// The code below is used to wire up dynamic settings to editors. When
// you include the result of calling `instance()` in an editor
// configuration, the TextEditor class will take care of listening to
// changes in the setting, and updating the configuration as
// appropriate.

export class DynamicSetting<T> {
  compartment = new Compartment();

  constructor(readonly settingName: string, private readonly getExtension: (value: T) => Extension) {}

  settingValue(): T {
    return "all" as unknown as T;
  }

  instance(): Extension {
    return [
      this.compartment.of(this.getExtension(this.settingValue())),
      dynamicSetting.of(this as DynamicSetting<unknown>),
    ];
  }

  sync(state: EditorState, value: T): StateEffect<unknown> | null {
    const cur = this.compartment.get(state);
    const needed = this.getExtension(value);
    return cur === needed ? null : this.compartment.reconfigure(needed);
  }

  static bool(name: string, enabled: Extension, disabled: Extension = empty): DynamicSetting<boolean> {
    return new DynamicSetting<boolean>(name, (val) => (val ? enabled : disabled));
  }

  static none: readonly DynamicSetting<unknown>[] = [];
}

function matcher(decorator: MatchDecorator): Extension {
  return ViewPlugin.define(
    (view) => ({
      decorations: decorator.createDeco(view),
      update(u): void {
        this.decorations = decorator.updateDeco(u, this.decorations);
      },
    }),
    {
      decorations: (v) => v.decorations,
    },
  );
}

const WhitespaceDeco = new Map<string, Decoration>();

function getWhitespaceDeco(space: string): Decoration {
  const cached = WhitespaceDeco.get(space);
  if (cached) {
    return cached;
  }
  const result = Decoration.mark({
    attributes:
      space === "\t"
        ? {
            class: "cm-highlightedTab",
          }
        : { class: "cm-highlightedSpaces", "data-display": "·".repeat(space.length) },
  });
  WhitespaceDeco.set(space, result);
  return result;
}

const showAllWhitespace = matcher(
  new MatchDecorator({
    regexp: /\t| +/g,
    decoration: (match: RegExpExecArray): Decoration => getWhitespaceDeco(match[0]),
    boundary: /\S/,
  }),
);

const showTrailingWhitespace = matcher(
  new MatchDecorator({
    regexp: /\s+$/g,
    decoration: Decoration.mark({ class: "cm-trailingWhitespace" }),
    boundary: /\S/,
  }),
);

export const showWhitespace = new DynamicSetting<string>("showWhitespacesInEditor", (value) => {
  if (value === "all") {
    return showAllWhitespace;
  }
  if (value === "trailing") {
    return showTrailingWhitespace;
  }
  return empty;
});
