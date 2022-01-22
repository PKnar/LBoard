import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/nav/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import ModifyPage from "./components/modifyPage/ModifyPage";
import Student from "./student/Student";
import Info from "./components/info/Info";

function App() {
  const [data, setData] = useState([]);

  const getStudents = async () => {
    const response = await axios("/api/students");
    setData(response.data);
    localStorage.setItem("students", JSON.stringify(response.data));
  };

  useEffect(async () => {
    await getStudents();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home data={data} />} />
          <Route path="/panel" element={<ModifyPage data={data} />} />
          <Route path="/student/:id" element={<Student />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
