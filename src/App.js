import { Provider } from "react-redux";
import Board from "./components/Board/Board";

import store from "./store/store";

function App() {
  return (
      <Provider store={store}>
        <Board />
      </Provider>
  );
}

export default App;
