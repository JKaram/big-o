import BarChart from "./components/charts/BarChart";
import { Layout } from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <BarChart width={450} height={300} />
    </Layout>
  );
}

export default App;
