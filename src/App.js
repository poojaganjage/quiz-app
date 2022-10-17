import SetupForm from './Form/SetupForm';
import Modal from './Modal/Modal';
import LoadingScreen from './Loading/LoadingScreen';
import {useGlobalContext} from './Context/Context';
import './App.css';

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestions,
    checkAnswers
  } = useGlobalContext();

  if(waiting) {
    return <SetupForm />
  }

  if(loading) {
    return <LoadingScreen />
  }

  const {incorrect_answers, correct_answer, question} = questions[index];
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  console.log(tempIndex);
  console.log(answers);
  if(tempIndex === 3) {
    console.log(answers.push(correct_answer));
    console.log(answers);
  } else {
    answers.push(answers[tempIndex]);
    console.log(answers);
    answers[tempIndex] = correct_answer;
    console.log(answers[tempIndex]);
    console.log(answers);
  }

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>Correct Answers: {correct}/{index}</p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html: question}} />
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return <button key={index} className="answer-btn" onClick={() => checkAnswers(correct_answer === answer)} dangerouslySetInnerHTML={{__html: answer}} />
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestions}>Next Questions</button>
      </section>
    </main>
  );
}
export default App;
