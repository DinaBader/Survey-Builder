import React, { useEffect, useState } from 'react';
import SurveyItem from '../../components/Survey/SurveyItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Index() {
    const navigate = useNavigate();

    const navigateAddSurvey = () => {
        navigate('/addsurvey');
    };
    const [surveyinfo, setSurveyInfo] = useState([]);

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
    const navigateToAddQuestion=(surveyId)=>{
        localStorage.setItem("surveyid",surveyId);
        navigate("/Questions")
    }
    const deleteSurvey=(surveyId)=>{
        axios.
        delete(`http://localhost:8000/survey/deleteSurvey/${surveyId}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(function (res) {
            console.log(res.data)
            getSurvey();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    return (
        <>
            <div className='container'>
                {surveyinfo && surveyinfo.map((survey, index) => (
                    <div key={index}>
                        <SurveyItem
                            title={survey.title}
                            description={survey.description}
                        />
                        <button className='btn' onClick={() => navigateToAddQuestion(survey._id)}>Add Question</button>
                        <br/>
                        <button className='btn' onClick={()=>deleteSurvey(survey._id)}>Delete Survey</button>
                    </div>
                ))}
                <button className='btn small' onClick={navigateAddSurvey}>Add Survey</button>
            </div>

        </>
    );
}

export default Index;
