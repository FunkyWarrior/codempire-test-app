import * as types from "../actionTypes"
import {questionApi} from '../api'


const getQuestionsRequest = () => ({
    type: types.GET_QUESTIONS_REQUEST
});

const getQuestionsSuccess = payload => ({
    type: types.GET_QUESTIONS_REQUEST_SUCCESS,
    payload
});

const getQuestionsFail = payload => ({
    type: types.GET_QUESTIONS_REQUEST_FAIL,
    payload
});

export const getQuestions = ()=> {
    return async dispatch => {
        dispatch(getQuestionsRequest());
        try {
            const {data} = await questionApi.get();
            dispatch(getQuestionsSuccess(data))
        } catch(error) {
            dispatch(getQuestionsFail(error))
        }
    }
};


const changeAnswer = payload => ({
    type: types.CHANGE_USER_ANSWER,
    payload
});

export const changeUserAnswer = payload => {
    return async (dispatch, getState) => {
        dispatch(changeAnswer(payload));
        const userAnswers = getState().main.userAnswers;
        await localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    }
};

const clearAnswers = () => ({
    type: types.CLEAR_USER_ANSWERS
});

export const clearUserAnswers = payload => {
    return dispatch => {
        localStorage.removeItem('userAnswers');
        dispatch(clearAnswers(payload));
    }
};

const checkAnswers = () => ({
    type: types.CHECK_USER_ANSWERS
});

export const checkUserAnswers = payload => {
    return dispatch => {
        localStorage.removeItem('userAnswers');
        dispatch(checkAnswers());
    }
};








