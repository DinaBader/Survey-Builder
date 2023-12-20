import React, { useEffect, useState } from 'react';
import SurveyItem from '../../components/Survey/SurveyItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Index() {
    const navigate = useNavigate();
    const [surveyinfo, setSurveyInfo] = useState([]);
    const navigateToAnswers=(surveyId)=>{
      localStorage.setItem("surveyid",surveyId);
      navigate("/Answers")
  }

    function getSurvey() {
        axios
            .get(`http://localhost:8000/survey/getSurveys`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
            .then(function (res) {
                console.log(res.data)
                setSurveyInfo(res.data.surveys);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getSurvey();
    }, []);
    return (
        <>
            <div className='container'>
                {surveyinfo.map((survey, index) => (
                    <div key={index}>
                        <SurveyItem
                            title={survey.title}
                            description={survey.description}
                        />
                        <button className='btn' onClick={() => navigateToAnswers(survey._id)}>Answer</button>
                    </div>
                ))}
            </div>

        </>
    );
}

export default Index;
