import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authorization from "./pages/Authorization";
import Status from "./pages/Status";
import Pppoe from "./pages/PPPOE";

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
          <Route path="/pppoe" element={<Pppoe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
