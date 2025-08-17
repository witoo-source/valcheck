// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const pages = import.meta.glob("./pages/*.tsx", { eager: true });
console.log(pages)

function App() {
  return (
    <Router>
      <Routes>
        {Object.entries(pages).map(([path, module]) => {
          // Convierte "./pages/Home.jsx" → "/home"
          const routePath =
            "/" +
            path
              .replace("./pages", "")
              .replace(".tsx", "")
              .toLowerCase()
              .replace("/index", "");
          const Page = (module as any).default;
          return <Route key={routePath} path={routePath} element={<Page />} />;
        })}
      </Routes>
    </Router>
  );
}

export default App;