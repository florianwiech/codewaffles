import { map, MonoTypeOperatorFunction, pipe } from "rxjs";

export function multiply3(factor: number): MonoTypeOperatorFunction<number> {
  return (source) => source.pipe(map((value) => value * factor));
}

export function multiply2(factor: number): MonoTypeOperatorFunction<number> {
  return pipe(map((value) => value * factor));
}

export function multiply(factor: number): MonoTypeOperatorFunction<number> {
  return map((value) => value * factor);
}
