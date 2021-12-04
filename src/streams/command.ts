import { filter, Subject } from "rxjs";
import { Command, CommandTypes, isPerformTransformCommand } from "../types";

export const command$ = new Subject<Command>();

export const closeSearch$ = command$.pipe(
  filter(({ type }) => type === CommandTypes.SEARCH_CLOSED)
);

export const performTransform$ = command$.pipe(
  filter(isPerformTransformCommand)
);
