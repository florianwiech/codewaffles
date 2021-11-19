import { TransformList } from "../TransformTypes";
import { createTimestampSeconds } from "./createTimestampSeconds";
import { createTimestampMillis } from "./createTimestampMillis";

export const scriptList: TransformList = [
  createTimestampSeconds,
  createTimestampMillis,
];
