import { FC } from "react";
import { Text } from "@codemirror/text";

function countChars(doc: Text) {
  return doc.length;
}

export const CharCounter: FC<{ doc: Text }> = ({ doc }) => {
  const count = countChars(doc);
  return <div>{count} chars</div>;
};
