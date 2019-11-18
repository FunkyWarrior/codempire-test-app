import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_REQUEST_SUCCESS,
    GET_QUESTIONS_REQUEST_FAIL,
    CHANGE_USER_ANSWER,
    CLEAR_USER_ANSWERS,
    CHECK_USER_ANSWERS
} from "../actionTypes"


const defaultState = {
    quiz: [],
    userAnswers: [],
    // results:[],
    score: 0,
    showResults: false,
    isFetching: false,
    error: false
};

export const mainReducer = (state = defaultState, action) => {
    switch (action.type) {

        case GET_QUESTIONS_REQUEST : {
            return {
                ...state,
                isFetching: true
            };
        }
        case GET_QUESTIONS_REQUEST_SUCCESS : {
            const newAnswers = [];
            action.payload.forEach(el => newAnswers.push({id: el.id, userAnswer: []}));
            return {
                ...state,
                quiz: action.payload,
                isFetching: false,
                userAnswers: localStorage.getItem('userAnswers') ? JSON.parse(localStorage.getItem('userAnswers')) : newAnswers
            };
        }
        case GET_QUESTIONS_REQUEST_FAIL : {
            return {
                ...state,
                error: action.payload,
                isFetching: false,
            };
        }

        case CLEAR_USER_ANSWERS : {
            const newAnswers = [];
            state.quiz.forEach(el => newAnswers.push({id: el.id, userAnswer: []}));
            return {
                ...state,
                userAnswers: newAnswers,
                showResults: false
            };
        }

        // case CLEAR_USER_ANSWERS : {
        //     const newAnswers = [];
        //     state.quiz.forEach(el => newAnswers.push({id: el.id, userAnswer: []}));
        //     return {
        //         ...state,
        //         userAnswers: newAnswers,
        //     };
        // }

        case CHECK_USER_ANSWERS : {
            let counter = 0;
            const newUserAnswers = state.userAnswers.slice();
            const newQuiz = state.quiz.slice();
            newQuiz.forEach(el => {
                if (el.answer.sort().every(function (element, index) {
                        const answer = newUserAnswers.find(item => item.id === el.id).userAnswer.sort()[index];
                        return element === (answer ? answer.trim().toLowerCase() : false)
                    }
                )) {
                    newUserAnswers.find(item => item.id === el.id)['correct'] = true;
                    counter++
                } else newUserAnswers.find(item => item.id === el.id)['correct'] = false;
            });
            return {
                ...state,
                score: counter,
                userAnswers: newUserAnswers,
                showResults: true,
            };
        }

        case CHANGE_USER_ANSWER : {
            const target = action.payload.target;
            const newUserAnswers = state.userAnswers.slice();
            const changedAnswer = newUserAnswers ? newUserAnswers.find(el => el.id === +target.id).userAnswer : [];
            target.checked ?
                changedAnswer.push(target.value) :
                changedAnswer.splice(changedAnswer.indexOf(target.value), 1);
            return {
                ...state,
                userAnswers: state.userAnswers.map(el => el.id === +target.id ?
                    target.type === 'checkbox' ?
                        {
                            ...el,
                            userAnswer: changedAnswer
                        } :
                        {
                            ...el,
                            userAnswer: target.value ? [target.value.toString()] : [target.innerText.toString()]
                        } :
                    el)

            };
        }

        default:
            return state
    }
};