import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import { Web3Provider } from "./app/providers/Web3Provider";

function App() {
  return (
    <BrowserRouter>
      <Web3Provider>
        <Layout>
          <HomePage />
        </Layout>
      </Web3Provider>
    </BrowserRouter>
  );
}

export default App;