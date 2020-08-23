import { REHYDRATE } from 'redux-persist';
import Constants from './QuizConstants';


let initialState = {
    selectedQuiz: ''
};


export default (state = initialState, action) => {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case REHYDRATE:
            newState = action.payload && action.payload.quiz ?
                Object.assign(action.payload.quiz) : newState;
            break;

        case Constants.ACTIONS.UPDATE_OPTION_SELECTED:
            newState.selectedQuiz = action.selectedQuiz;
            break;
            
        case Constants.ACTIONS.CLAER_QUIZ_OPTION:
        case Constants.ACTIONS.CLEAR_DATA:
            newState = initialState;
            break;
        default:
            break;
    }
    return newState;
};