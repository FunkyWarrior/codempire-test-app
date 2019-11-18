import React from 'react';
import CustomSelect from "../CustomSelect"
export default class QuestionBlock extends React.Component {
    changeAnswer = e => {
        this.props.changeAnswer(e)
    };

    renderSwitch(question, type, id, options, userAnswers) {
        const answerExist = userAnswers.find(el => el.id === id) ? userAnswers.find(el => el.id === id).userAnswer : [];
        switch (type) {
            case 'checkbox' :
            case 'radio' :
                return (

                    <div className='question-block__options'>
                        <ul>
                            {options.map(opt =>
                                <li key={opt}>
                                    <label >
                                        <input
                                            className={type === 'checkbox' ? 'option-input checkbox' : "option-input radio"}
                                            type={type}
                                            id={id}
                                            name={question}
                                            value={opt}
                                            checked={!!answerExist.find(el => el === opt)}
                                            onChange={this.changeAnswer}
                                        /><span>{opt}</span>
                                    </label>
                                </li>
                            )}
                        </ul>

                    </div>
                );
            case 'textarea' :
                return (
                    <input
                        className='text-area'
                        placeholder='Введите ответ'
                        autoComplete='off'
                        type={type}
                        id={id}
                        value={answerExist.length > 0 ? answerExist[0] : ''}
                        onChange={this.changeAnswer}
                    />
                );
            case 'select' :
                return (
                    <CustomSelect
                        options={options}
                        id={id}
                        value={answerExist.length > 0 ? answerExist[0] : 'Выберите ответ'}
                        onChange={this.changeAnswer}
                    />
                    // {/*<select*/}
                    // {/*    id={id}*/}
                    // {/*    value={answerExist.length > 0 ? answerExist[0] : 'Выберите вариант'}*/}
                    // {/*    onChange={this.changeAnswer}*/}
                    // {/*>*/}
                    // {/*    <option disabled>Выберите вариант</option>*/}
                    // {/*    {options.map(opt =>*/}
                    // {/*        <option key={opt} value={opt}>{opt}</option>*/}
                    // {/*    )}*/}
                    // {/*</select>*/}
                );
            default :
                return null
        }
    }

    render() {
        const {userAnswers, question, type, id, options} = this.props;
        return (
            <div className='question-block'>
                <p>{question}</p>
                    {this.renderSwitch(question, type, id, options, userAnswers)}
                </div>
        );
    }
}