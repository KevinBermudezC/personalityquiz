import Header from "./components/Header.jsx";
import { Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm.jsx";
import Question from "./components/Question.jsx";
import Results from "./components/Results.jsx";
import { useEffect, useState } from "react";
import { UserProvider } from "./components/UserContext.jsx";

function App() {
  const [userName, setUserName] = useState("");
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [element, setElement] = useState({});
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };
  const elements = {
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",

  };

  async function fetchArtwork(keyword) {
    setLoading(true);
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setArtwork(data.message);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      const selectedElement = determineElement(answers);
      setElement(selectedElement);
      fetchArtwork(keywords[selectedElement]);
    }
  }, [currentQuestionIndex]);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
    setArtwork(null); // Reset artwork state
    const selectedElement = determineElement(answers);
    fetchArtwork(keywords[selectedElement]);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  return (
    <UserProvider value={{ name: userName, setName: setUserName }}>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element.toString()} artwork={artwork} loading={loading} />
            )
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default App;
