import { Editor } from "./editor";
import { Spotlight } from "./spotlight-search";
import { scriptList } from "./transforms/scripts";

function App() {
  return (
    <>
      <Editor />
      <Spotlight scripts={scriptList} />
    </>
  );
}

export default App;
