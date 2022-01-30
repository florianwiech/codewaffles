import { BrowserAppearance } from "@codewaffle/components";
import { scriptList } from "@codewaffle/scripts";
import { Editor } from "./editor";
import { Spotlight } from "./spotlight-search";

function App() {
  return (
    <BrowserAppearance>
      <Editor />
      <Spotlight scripts={scriptList} />
    </BrowserAppearance>
  );
}

export default App;
