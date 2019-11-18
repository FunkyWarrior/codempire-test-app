import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import ConfirmButton from "../ConfirmButton";
import QuestionBlock from "../QuestionBlock";

import {
    changeUserAnswer,
    clearUserAnswers,
    checkUserAnswers
} from '../../actions'


class QuestionPage extends React.Component {
    state = {
        showConfirm: false
    };

    changeConfirm = () => {
        const {userAnswers} = this.props;
        if (userAnswers.every(el => el.userAnswer.length !==0 && el.userAnswer[0] !== '')){
            this.checkAnswer()
        } else this.setState({showConfirm: !this.state.showConfirm})

    };

    checkAnswer = () => {
        this.props.checkUserAnswers();
    };

    clearAnswers = () => {
        this.props.clearUserAnswers()
    };

    render() {
        const {quiz, userAnswers, changeUserAnswer , showResults} = this.props;
        if (showResults) return <Redirect push to='/results'/>;
        return (
            <div className='main'>
                {quiz.map(el =>
                    <QuestionBlock
                        key={el.id}
                        changeAnswer={changeUserAnswer}
                        {...el}
                        userAnswers={userAnswers}
                    />
                )}
                <div className='question-buttons'>
                    <button onClick={this.clearAnswers}>очистить поля</button>
                    <button onClick={this.changeConfirm}>перейти к результатам</button>
                </div>
                {
                    this.state.showConfirm &&
                    <ConfirmButton yes={this.checkAnswer} no={this.changeConfirm}
                                   text={`Вы уверены что хотите перейти к старнице результатов? 
                                   Каждый вопрос без ответа будет засчитан как "неправильный".`}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quiz: state.main.quiz,
        userAnswers: state.main.userAnswers,
        showResults: state.main.showResults,
        newAnswers: state.main.newAnswers
    }
};

const mapDispatchToProps = {
    changeUserAnswer,
    clearUserAnswers,
    checkUserAnswers,

};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage)