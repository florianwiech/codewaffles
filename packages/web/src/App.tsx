import { BrowserAppearance } from "@codewaffle/components";
import { Editor } from "./editor";
import { Spotlight } from "./Spotlight";

function App() {
  return (
    <BrowserAppearance>
      <Editor />
      <Spotlight />
    </BrowserAppearance>
  );
}

export default App;
