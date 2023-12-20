import {React,useState,useEffect} from 'react'
import Question from "../../components/questions/index"
import axios from 'axios';
import Answer from "../../components/answer/Index"
function Index() {
    const [questions,setQuestions]=useState([]);
    const [answer,setAnswer]=useState([]);
    const surveyid=localStorage.getItem('surveyid');
  
    function getquestion(){
      axios
      .get(
        `http://localhost:8000/question/getquestionbyid/${surveyid}`,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          }
        }
      ).then((res)=>{
        console.log(res.data);
        setQuestions(res.data.result);
      }).catch((error)=>{
        console.log(error);
      })
    }
    useEffect(() => {
      getquestion();
    }, []);

    const handleAnswerChange = (questionId, answer) => {
        setAnswer((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: answer,
        }));
      };
    
    const handleSubmit=()=>{
        const userId=localStorage.getItem('user._id');
        const responses = Object.entries(answer).map(([questionId, text]) => ({
            questionId,
            text,
          }));
        axios
        .post('http://localhost:8000/answer/saveAnswer',
        {
            userId,
            responses
        },
        {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            }
        }
        ).then((res)=>{
            console.log(res.data);
        })
    }
  return (
        <div>
            <h1>Questions</h1>
            {questions && questions.map((question, index) => (
                <div key={index}>
                <Question
                    description={question.description}
                />
                <input
                    value={answer[question._id] || ''}
                    placeholder="Enter your answer"
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                />
                </div>
            ))}
            <button type='submit' className='btn small' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Index