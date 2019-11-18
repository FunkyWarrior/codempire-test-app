import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import ResultBlock from "../ResultBlock"
import {
    changeUserAnswer,
    clearUserAnswers
} from "../../actions";


class ResultPage extends React.Component {
    state = {
        showMoreDetails : false
    };

    showDetailedResults = () => {
        this.setState({showMoreDetails: !this.state.showMoreDetails})
    };

    tryAgain = () => {
        this.props.clearUserAnswers()
    };

    render() {
        const {quiz,showResults,score,userAnswers} = this.props;
        if (!showResults) return <Redirect exact to='/questions'/>;
        return (
            <div className='main'>
                <div  className='result-page' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <h2>Ваш результат: {score} из {quiz.length}</h2>
                    <button className='result-page__button' onClick={this.tryAgain}>Попробывать еще раз</button>
                    <button className='result-page__button' onClick={this.showDetailedResults}>Показать детальный результат</button>
                </div>
                {this.state.showMoreDetails ? quiz.map(el => <ResultBlock key={el.id} {...el} answers={userAnswers}/>) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        quiz: state.main.quiz,
        userAnswers: state.main.userAnswers,
        score: state.main.score,
        showResults: state.main.showResults
    }
};

const mapDispatchToProps = {
    changeUserAnswer,
    clearUserAnswers
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage)