import { Layout } from "./ui";
import { useKeyPress } from "./utils/useKeyPress";

function App() {

  const handleKeyPress = () => {
    console.log("pressed");
  };

  useKeyPress("k", handleKeyPress);

  return (
    <Layout>
      <h1>App</h1>
    </Layout>
  );
}

export default App;
