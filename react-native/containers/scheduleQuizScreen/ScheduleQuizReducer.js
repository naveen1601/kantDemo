import { REHYDRATE } from 'redux-persist';
import Constants from './ScheduleQuizConstants';


let initialState = {

    scheduleQuizList: [],
    currentQuiz: {
        outerQuizId: '',
        innerQuizId: '',
        sequence: 0
    },
    errorMessage: ''
};


export default (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.scheduleQuiz ?
                Object.assign(action.payload.scheduleQuiz) : newState;
            break;

        case Constants.ACTIONS.UPDATE_QUIZ_LIST:
            newState.scheduleQuizList = action.scheduleQuizData;
            newState.errorMessage = ''
            break;

        // case Constants.ACTIONS.UPDATE_SEQUENCE:
        //     newState.currentSequence = action.sequence;
        //     break;

        case Constants.ACTIONS.UPDATE_CURRENT_QUIZ_ID:
            newState.currentQuiz = action.currentQuiz;
            break;

        case Constants.ACTIONS.GENERAL_ERROR:
            newState.errorMessage = action.message;
            break;
        case Constants.ACTIONS.CLEAR_SCHEDULE:
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
};