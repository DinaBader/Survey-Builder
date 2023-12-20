import React from 'react';
import "./style.css"
const SurveyItem = ({ title, description }) => {

    return (
        <div className='survey-container'>
            <h3>Title:</h3>
            <p>{title}</p>
            <h3>Description:</h3>
            <p>{description}</p>
        </div>
    );
};

export default SurveyItem;
