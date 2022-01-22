import { scriptList } from "@codewaffle/scripts";
import { Editor } from "./editor";
import { Spotlight } from "./spotlight-search";

function App() {
  return (
    <>
      <Editor />
      <Spotlight scripts={scriptList} />
    </>
  );
}

export default App;
