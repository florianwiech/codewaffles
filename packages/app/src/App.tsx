import { create as createRxSpy } from "rxjs-spy";
import { Editor } from "./editor";
import { Spotlight } from "./spotlight-search";
import { scriptList } from "./scripts";
import { Layout } from "./ui";

if (process.env.NODE_ENV !== "production") {
  createRxSpy();
}

export function App() {
  return (
    <Layout>
      <Editor />
      <Spotlight scripts={scriptList} />
    </Layout>
  );
}

export default App;
