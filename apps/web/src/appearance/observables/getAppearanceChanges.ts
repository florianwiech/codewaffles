import { merge, withLatestFrom } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { tag } from "rxjs-spy/operators";
import { AppearanceState } from "@codewaffle/components";
import { appearance$, previousAppearance$ } from "../appearance-subjects";
import { APPEARANCE_ATTRIBUTE, APPEARANCE_STORAGE } from "../utils/appearance-keys";
import { convertAppearanceToTheme } from "../operators/convertAppearanceToTheme";

export const getAppearanceChanges = (source$ = appearance$) => {
  const shouldChange$ = source$.pipe(
    withLatestFrom(previousAppearance$),
    map(([next, previous]) => ({ next, previous })),
    filter(({ next, previous }) => next !== previous),
    map(({ next }) => next),
  );

  const updateDocument$ = shouldChange$.pipe(
    convertAppearanceToTheme(),
    tap((theme) => document.documentElement.setAttribute(APPEARANCE_ATTRIBUTE, theme.toString())),
    tag("document-updater"),
  );

  const updateStorage$ = shouldChange$.pipe(
    tap((appearance) =>
      appearance === AppearanceState.SYSTEM
        ? localStorage.removeItem(APPEARANCE_STORAGE)
        : localStorage.setItem(APPEARANCE_STORAGE, appearance),
    ),
    tag("storage-updater"),
  );

  const updateOtherTabs$ = shouldChange$.pipe(
    tap((next) => {
      if (window.BroadcastChannel === undefined) return;

      const channel = new BroadcastChannel("appearance");
      channel.postMessage(next);
      channel.close();
    }),
    tag("cross-tab-updater"),
  );

  const updateHistory$ = shouldChange$.pipe(
    tap((next) => previousAppearance$.next(next)),
    tag("history-updater"),
  );

  return merge(updateDocument$, updateStorage$, updateOtherTabs$, updateHistory$);
};
