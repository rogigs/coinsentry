import { ItemProvider } from "./context/useItem";
import Home from "./pages/Home";

function App() {
  return (
    <ItemProvider>
      <Home />
    </ItemProvider>
  );
}

export default App;
