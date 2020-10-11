import $_ from './QuestionAnswerSettings';

export default {
    questionBoxContainer: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'space-around',
        borderColor: '#255166',
        marginTop: 10,
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingLeft: 12,  
        paddingRight: 12, 
    },
    questionBoxText:{
        paddingTop: 10,
        fontSize: 18,
        textAlign: 'justify'
    },
    answerBoxContainer:{
        marginTop: 20,
        marginBottom: 10,
    },
    validationErrorText:{
        color: 'red',
    },
    imageBox: {
        width: 150,
        height: 150,
        resizeMode: 'center'
    },
}