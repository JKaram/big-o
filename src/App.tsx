import BarChart from "./components/charts/BarChart";
import Nodes from "./components/charts/Nodes";
import { Layout } from "./components/layout/Layout";
import { bubbleSort } from "./lib/algos";

function App() {
  return (
    <Layout>
      <BarChart width={450} height={300} algoCallback={bubbleSort} />
      <Nodes />
    </Layout>
  );
}

export default App;
