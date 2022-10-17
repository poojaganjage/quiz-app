import {useState, useContext, createContext} from 'react';
import axios from 'axios';

const table = {
    sports: 21,
    history: 23,
    politics: 24
}
const AppContext = createContext();
function AppProvider({children}) {
    const [waiting, setWaiting] = useState(true); //waiting
    const [loading, setLoading] = useState(false); //loading
    const [questions, setQuestions] = useState([]); //questions
    const [index, setIndex] = useState(0); //index
    const [correct, setCorrect] = useState(0); //correct
    const [error, setError] = useState(false); //error
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: "sports",
        difficulty: "easy"
    }); //quiz
    const [modal, setModal] = useState(false); //modal
    
    // fetchQuestions
    const fetchQuestions = async(url) => {
        setLoading(true);
        setWaiting(false);
        const response = await axios.get(url)
        .catch((error) => console.log(error));
        console.log(response);
        if(response) {
            const data = response.data.results;
            if(data.length > 0) {
                setQuestions(data);
                setLoading(false);
                //setWaiting(false);
                setError(false);
            } else {
                //setWaiting(true);
                setLoading(true);
            }
        } else {
            setWaiting(true);
            setError(true);
        }
    }

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setWaiting(true);
        setCorrect(0);
    }

    const nextQuestions = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1;
            console.log(questions.length);
            if(index > questions.length - 1) {
                openModal();
                return 0;
            } else {
                return index;
            }
        });
    }

    const checkAnswers = (value) => {
        if(value) {
            setCorrect((oldState) => {
                return oldState + 1;
            });
        }
        //nextQuestions();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuiz({...quiz, [name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {amount, difficulty, category} = quiz;
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
        fetchQuestions(url);
    }

    return (
        <AppContext.Provider value={{
            waiting, loading, questions, index, correct, error, quiz, modal, closeModal, nextQuestions, checkAnswers, handleChange, handleSubmit
        }}>
            {children}
        </AppContext.Provider>
    );
}
const useGlobalContext = () => {
    return useContext(AppContext);
}
export {useGlobalContext, AppProvider};
