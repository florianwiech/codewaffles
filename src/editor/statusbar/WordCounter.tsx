import { FC } from "react";
import { Text } from "@codemirror/text";

function countWords(doc: Text) {
  let count = 0,
    iter = doc.iter();
  while (!iter.next().done) {
    let inWord = false;
    for (let i = 0; i < iter.value.length; i++) {
      let word = /\w/.test(iter.value[i]);
      if (word && !inWord) count++;
      inWord = word;
    }
  }
  return count;
}

export const WordCounter: FC<{ doc: Text }> = ({ doc }) => {
  const count = countWords(doc);

  return <div>{count} words</div>;
};
