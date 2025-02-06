import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Authorization from "./pages/Authorization";
import Status from "./pages/Status";

function App() {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route path="/" element={<Authorization />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
