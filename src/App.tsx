import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import First from "./pages/First";
import Second from "./pages/Second";
import { useState } from "react";

function App() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <First setSubmitted={setSubmitted} />
            }
          />
          <Route path="/second" element={<Second submitted={submitted} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
