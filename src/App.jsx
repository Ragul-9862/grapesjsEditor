import "grapesjs/dist/css/grapes.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditorProvider } from "./context/editorContext";

function App() {
  return (
    <>
      <EditorProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </EditorProvider>
    </>
  );
}

export default App;
