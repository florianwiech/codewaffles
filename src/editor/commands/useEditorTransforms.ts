import { useEffect } from "react";
import { Command, ScriptExtension } from "../../types";
import {
  closeSearch$,
  editorDispatch$,
  performTransform$,
  scriptResult$,
} from "../../modifier";
import { CodeMirrorEditor } from "../editor.types";
import {
  concatMap,
  concatWith,
  debounceTime,
  delay,
  map,
  mergeWith,
  of,
  pipe,
  switchMap,
  tap,
  throttleTime,
} from "rxjs";
import { EditorView } from "@codemirror/view";
import { scriptCollection } from "../../scripts";
import { EditorSelection } from "@codemirror/state";

type CommandStream = {
  command: Command;
  view?: EditorView;
};

// const closeSearch = new Observable<CommandStream>().pipe(
//   filter(({ command }) => command.type === CommandTypes.SEARCH_CLOSED),
//   tap(({ view }) => view.focus())
// );
//
// const performTransform = new Observable<CommandStream>().pipe(
//   filter(({ command }) => command.type === CommandTypes.PERFORM_TRANSFORM),
//   tap((command) => console.log(command, "LOL"))
// );

// const closeSearch = (view?: EditorView) =>
//   command$.pipe(
//     filter(({ type }) => type === CommandTypes.SEARCH_CLOSED),
//     tap(() => view?.focus()),
//     tap((key) => of(key).pipe()),
//     tap(() => console.log("closesd search"))
//   );

const getCloseSearch = (view: EditorView) =>
  closeSearch$.pipe(
    tap(() => view.focus()),
    tap(() => console.log("search closed now and focused"))
  );

const getPerformTransform = (view: EditorView) =>
  performTransform$.pipe(
    // delay(2000),
    tap(console.log),
    map(({ key }) => scriptCollection[key]),
    tap(console.log),
    concatMap(async ({ handler }) => await handler(view.state.doc.toString())),
    tap((result) => console.log("executed transform", result)),
    map((result) => ({
      changes: { from: 0, to: view.state.doc.length, insert: result },
      selection: EditorSelection.cursor(result.length),
    })),
    map((spec) => view.state.update(spec)),
    tap(view.dispatch),
    tap(() => view.focus())
  );

export const useEditorTransforms = (editor: CodeMirrorEditor) => {
  // useEffect(() => {
  //   if (!editor.current) return;
  //
  //   const sub = getCloseSearch(editor.current).subscribe();
  //
  //   // const sub = closeSearch$.pipe().subscribe(() => editor.current?.focus());
  //   return sub.unsubscribe;
  // }, [editor]);
  //
  // useEffect(() => {
  //   if (!editor.current) return;
  //
  //   const sub = getPerformTransform(editor.current).subscribe();
  //
  //   return sub.unsubscribe;
  // }, [editor]);

  // useEffect(() => {
  //   if (!editor.current) return;
  //
  //   // if I get it correct, this is a cold observer
  //   // that also means every time we subscribe to it, it gets recreated
  //   const sub = of(editor.current)
  //     .pipe(
  //       mergeWith(
  //         getCloseSearch(editor.current),
  //         getPerformTransform(editor.current)
  //       )
  //     )
  //     .subscribe();
  //
  //   return () => sub.unsubscribe();
  // }, [editor]);

  useEffect(() => {
    const sub = editorDispatch$.subscribe();
    return () => sub.unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (!editor.current) return;
  //
  //   const isSingleCursorWithoutSelection = (ranges: SelectionRange[]) =>
  //     ranges.length === 1 && ranges[0].from === ranges[0].to;
  //
  //   // const performTransform = command$.pipe(
  //   //   filter<Command>(({ type }) => type === CommandTypes.PERFORM_TRANSFORM),
  //   //   // tap<Command>((command) => console.log(command, "LOL")),
  //   //   map(({ key }) => scriptCollection[key]),
  //   //   throwIfEmpty<ScriptExtension>(),
  //   //   // todo maybe map the stuff we need form the editor
  //   //   iif(
  //   //     isSingleCursorWithoutSelection(
  //   //       editor.current?.state?.selection?.ranges || []
  //   //     )
  //   //   )
  //   //   // todo check if singleSelection
  //   // );
  //
  //   // const test = connectable(command$).pipe();
  //   //
  //   // const subscription = command$
  //   //   .pipe(concatMap(() => mergeWith(closeSearch(editor.current))))
  //   //   // .pipe(mergeWith(closeSearch, performTransform))
  //   //   .subscribe();
  //
  //   const subscription = command$.subscribe((command) => {
  //     if (!editor.current) return;
  //
  //     switch (command.type) {
  //       case CommandTypes.SEARCH_CLOSED:
  //         // editor.current.focus();
  //         break;
  //       case CommandTypes.PERFORM_TRANSFORM:
  //         const { handler, append } = scriptCollection[command.key];
  //
  //         if (handler) {
  //           const { dispatch, state } = editor.current;
  //           const { ranges } = state.selection;
  //
  //           const isSingleCursorWithoutSelection =
  //             ranges.length === 1 && ranges[0].from === ranges[0].to;
  //
  //           if (isSingleCursorWithoutSelection) {
  //             const result = handler(state.doc.toString());
  //
  //             if (append) {
  //               const { from } = state.selection.ranges[0];
  //               dispatch(
  //                 state.update({
  //                   changes: {
  //                     from: from,
  //                     insert: result,
  //                   },
  //                   selection: EditorSelection.cursor(from + result.length),
  //                 })
  //               );
  //             } else {
  //               dispatch(
  //                 state.update({
  //                   changes: { from: 0, to: state.doc.length, insert: result },
  //                 })
  //               );
  //             }
  //           } else {
  //             dispatch(
  //               state.changeByRange((range) => {
  //                 const result = handler(state.sliceDoc(range.from, range.to));
  //
  //                 const isCursorPlacement = range.from === range.to;
  //                 let changes = [];
  //                 let nextRange;
  //
  //                 if (isCursorPlacement) {
  //                   changes.push({ from: range.from, insert: result });
  //                   nextRange = EditorSelection.cursor(
  //                     range.from + result.length
  //                   );
  //                 } else {
  //                   changes.push({
  //                     from: range.from,
  //                     to: range.to,
  //                     insert: result,
  //                   });
  //                   nextRange = EditorSelection.range(
  //                     range.from,
  //                     range.from + result.length
  //                   );
  //                 }
  //
  //                 return { changes, range: nextRange };
  //               })
  //             );
  //           }
  //         }
  //         // editor.current?.focus();
  //         break;
  //     }
  //   });
  //
  //   return () => subscription.unsubscribe();
  // }, [editor]);
};
