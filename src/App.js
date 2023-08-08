import { ItemProvider } from "./context/useItem";
import Home from "./pages/Home";

const App = () => {
  return (
    <ItemProvider>
      <Home />
    </ItemProvider>
  );
};

export default App;
