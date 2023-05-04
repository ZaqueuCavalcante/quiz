import Quiz from "./Quiz";
import { ReactQuiz } from "./consts.js";

function App() {
  return <Quiz questions={ReactQuiz.questions}></Quiz>;
}

export default App;
