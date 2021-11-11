import { Layout } from "./ui";
import { useKeyPress } from "./utils/useKeyPress";
import { Editor } from "./editor";

function App() {
  const handleKeyPress = () => {};

  useKeyPress("k", handleKeyPress);

  return (
    <Layout>
      <Editor />
    </Layout>
  );
}

export default App;
