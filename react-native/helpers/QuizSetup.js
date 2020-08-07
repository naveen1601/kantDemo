import MasterData from '../staticData/masterData.json';
import Questions from '../staticData/questions_txt.json';
import SubQuestions from '../staticData/subQuestions_txt.json';
import {randomValueFromArray, AllCompetencyArray}  from './CommonHelper';
import _ from 'lodash';
import Config from '../Configs';

// var AllCompetencyArray;

export function findQuestionsForQuiz(competencyArray, numberOfQuestions = 7) {

    const competencyList = [];
    let allCompetencyNumbers = [];
    
    let finalCompetencyListFromMaster;

    if(!competencyArray.length) return null;

    for (let i = 0; i < numberOfQuestions; i++) {
        competencyList.push({
            id: i,
            competency: randomValueFromArray(competencyArray),
            subjectData: []
        });
    }

    //Get List of subjects for each competency
    MasterData.forEach(masterRecord => {
        competencyList.forEach(element => {
            masterRecord.competency == element.competency &&
                element.subjectData.push(masterRecord);
        });
        allCompetencyNumbers.push(masterRecord.competency)
    });

    //get unique competency list 
    allCompetencyNumbers = allCompetencyNumbers.filter(function(item, index){
        return allCompetencyNumbers.indexOf(item)== index; 
      });


    //Select one Subject for each compentency
    finalCompetencyListFromMaster = competencyList.map(item => {
        return randomValueFromArray(item.subjectData);
    });


    Config.COMPETENCY_LIST = allCompetencyNumbers.sort(compare);

    return findQuestionsFromQuestionFile(finalCompetencyListFromMaster);
}


export function findQuestionsFromQuestionFile(competencyAndLevelList) {
    
    let finalQuestionList;
    
    const masterListOfCompetency = competencyAndLevelList.map(item => {
        return { ...item, questionsArray:[] }
    });
    
    if (!masterListOfCompetency.length) return null;
    
    //find all the questions which has same competency and level
    Questions.forEach(ques => {
        masterListOfCompetency.forEach(item => {
            ques.subject == item.subject && ques.level == item.level &&
            item.questionsArray.push(ques);
        });
    });
    
    //find all the questions which has same competency if level doesn't found
    masterListOfCompetency.forEach(item => {
        item.questionsArray.length < 1 && Questions.forEach(ques => {
            ques.subject == item.subject &&
            item.questionsArray.push(ques);
        });
    });
    
    const quesIds = [];
    //console.log('masterListOfCompetency ',masterListOfCompetency)
    
    //find one question from each competency
    finalQuestionList = masterListOfCompetency.map(item => {
        // remove already picked ques
        quesIds.map( queId => _.remove(item.questionsArray, { id: queId}));
        //select one randon question
        let que = randomValueFromArray(item.questionsArray);
        if(que) {
            quesIds.push(que.id);
            return que;
        }
    });

    //console.log('finalQuestionList ',finalQuestionList)
    
    // if questionList has Group question, find group ques.
    finalQuestionList = finalQuestionList.map((question)=>{
        const ques = question && (question.group == 'G' ? findSubQuestion(question) : question);
        return ques;
    });
    
    // console.log('final List ', finalQuestionList);
    return finalQuestionList;
    
}

function findSubQuestion(questionObj){
    const subQuesArray =[];
    
    //find all sub questions which has same Subject and level
    SubQuestions.forEach(ques => {
        ques.subject == questionObj.subject && ques.level == questionObj.level &&
        subQuesArray.push(ques);
    });
    
    //find all sub questions which has same Subject if level is not present 
    subQuesArray.length<1 && SubQuestions.forEach(ques => {
        ques.subject == questionObj.subject &&
        subQuesArray.push(ques);
    });
    
    return randomValueFromArray(subQuesArray);
}

function compare(a, b) {
    if (a > b) return 1;
    if (b > a) return -1;
  
    return 0;
}