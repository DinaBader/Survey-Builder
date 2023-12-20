import {React,useState,useEffect} from 'react'
import Question from "../../components/questions/index"
import axios from 'axios';
function Questions() {
  const [questions,setQuestions]=useState([]);
  const [description,setQuestionDescription]=useState('');
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

  const handlequestiondescriptionchange=(e)=>{
    setQuestionDescription(e.target.value);
  }
  const AddQuestion=()=>{
    axios 
    .post(`http://localhost:8000/question/addquestion/${surveyid}`,
    {
      description
    },
    {
      headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      }
    }
    ).then((res)=>{
      console.log("Question added successfully");
      setQuestionDescription('');
      getquestion(); 

    }).catch((error)=>{
      console.log(error);
    })
  }
  const DeleteQuestion=(questionId)=>{
    axios
    .delete(
      `http://localhost:8000/question/deletequestion/${questionId}`,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }
      }
    ).then((res)=>{
      console.log("Question deleted");
      getquestion(); 

    }).catch((error)=>{
       console.log(error.message);
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
          <button onClick={()=>DeleteQuestion(question._id)}>DeleteQuestion</button>
        </div>
      ))}
      <input
        type='text'
        value={description}
        onChange={handlequestiondescriptionchange}
      />
      <button onClick={AddQuestion} type="submit">Add Question</button>
    </div>
  )
}

export default Questions