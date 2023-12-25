import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CharacterContextProvider } from "./context/character-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CharacterContextProvider>
    <App />
  </CharacterContextProvider>
);
