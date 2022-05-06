import "./App.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// import des components
import Header from "./components/Header";

// import des pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      //action de connection
      Cookies.set("userToken", token);
    } else {
      //action de deconnection
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header token={token} handleToken={handleToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
