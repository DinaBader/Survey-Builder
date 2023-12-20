import {React,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css"
function AddSurvey() {
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('');
  const navigate=useNavigate();
  const handleTitleChange=(e)=>{
    setTitle(e.target.value);
  }
  const handleDescriptionChange=(e)=>{
    setDescription(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios
    .post(
      "http://localhost:8000/survey/addSurvey",
      {
        title,
        description
      },
      {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then((res)=>{
        navigate('/AdminDahsboard')
      })
      .catch((error)=>{
        console.log(error);
      })
    
  }
  return (
    <div class="question-container">
      <label>Title:</label>
      <input 
      value={title}
      onChange={handleTitleChange}
      className='box'
      />
      <label>Description</label>
      <input
      value={description}
      onChange={handleDescriptionChange}
      className='box'
      />
      <button className='btn small' type="submit"onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddSurvey