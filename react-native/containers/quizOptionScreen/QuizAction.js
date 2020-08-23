import QuizConstants from "./QuizConstants";


export default {
    clearQuizOption: function () {
        return function (dispatch) {
            dispatch({
                type: QuizConstants.ACTIONS.CLAER_QUIZ_OPTION,
            });
        }
    },
    updateQuizSelection: function (selectedQuiz) {
        return function (dispatch) {
            dispatch({
                type: QuizConstants.ACTIONS.UPDATE_OPTION_SELECTED,
                selectedQuiz 
            });
        }
    }
}