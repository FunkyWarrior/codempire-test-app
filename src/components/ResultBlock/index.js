import React from 'react';

const ResultBlock = props => {
    const {question,answer,id,answers} = props;
    const userAnswer = answers.find(el => el.id === id);
    return (
        <div className='result-block' style={{backgroundColor:userAnswer.correct ? '#a3edb6' : '#de9484'}}>
            <h3>{question}</h3>
                <p>Ваш ответ: {((userAnswer.userAnswer.length > 0) && (userAnswer.userAnswer[0] !== '')) ? userAnswer.userAnswer.join(', ').toLowerCase() : 'Ничего не ответили'}</p>
                <p>Правильный ответ: {answer.join(', ')}</p>
        </div>
    );
};

export default ResultBlock;