import { Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Updatebook from "./components/crud-forms/Updatebook";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/updateBook/:id" element={<Updatebook />} />
      </Routes>
    </div>
  );
}

export default App;
