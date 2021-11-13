import { useKeyPress } from "./utils/useKeyPress";
import { Editor } from "./editor";

function App() {
  const handleKeyPress = () => {};

  useKeyPress("k", handleKeyPress);

  return (
    <>
      <Editor />
    </>
  );
}

export default App;
