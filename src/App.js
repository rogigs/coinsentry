import { ItemProvider } from './context/useItem';
import Home from './pages/Home';

const App = () => (
  <ItemProvider>
    <Home />
  </ItemProvider>
);

export default App;
