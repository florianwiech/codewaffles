import { BrowserAppearance } from "./BrowserAppearance";
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
