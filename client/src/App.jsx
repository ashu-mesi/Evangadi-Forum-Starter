import React, { useEffect, useState, createContext } from "react";
import LandingLayout from "./pages/landingLayout/LandingLayout";
import Home from "./pages/Home/Home";
import Answer from "./components/Answer/Answer";
import { Route, Routes, useNavigate} from "react-router-dom";
import axios from "./axiosConfig";
import Question from "./components/Question/Question";

export const AppState = createContext();

function App() {
  const [user, setuser] = useState({});
  const [question, setQuestion] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      checkUser(token);
      getQuestion(token);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  async function checkUser(token) {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate("/login");
    }
  }

  // Fetch the question data
  async function getQuestion(token) {
    try {
      const { data } = await axios.get("/questions/all-questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(data); // Assuming data holds the question value
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  }

  return (
    <AppState.Provider value={{ user, setuser, question, setQuestion, token }}>
      <Routes>
        <Route path="/login" element={<LandingLayout />} />
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/answer" element={<Answer />} />
      </Routes>
    </AppState.Provider>
  );
}

export default App;