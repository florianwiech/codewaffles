import { BrowserAppearance } from "./BrowserAppearance";
import { CodeMirror } from "./CodeMirror";
import { Spotlight } from "./Spotlight";

function App() {
  return (
    <BrowserAppearance>
      <CodeMirror />
      <Spotlight />
    </BrowserAppearance>
  );
}

export default App;
