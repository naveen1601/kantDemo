import Config from '../Configs';
import CompetencyList from '../staticData/competencyList';
import moment from 'moment';
import axios from "axios";

export const CompetencyAndGradeArray = {
    1: [170, 180, 190, 200, 210],
    2: [180, 190, 200, 210, 220],
    3: [280, 290, 300, 310, 320],
    4: [380, 390, 400, 410, 420],
    5: [480, 490, 500, 510, 520],
    6: [580, 590, 600, 610, 620],
    7: [680, 690, 700, 710, 720],
    8: [780, 790, 800, 810, 820],
    9: [880, 890, 900, 910, 920],
    10: [980, 990, 1000, 1010, 1020],
    11: [1080, 1090, 1100, 1110, 1120],
    12: [1180, 1190, 1200, 1210, 1220]
};

export function findCompetencyList(grade) {
    return CompetencyAndGradeArray[grade];
}

export function getCompetencyListForOnline(competency, grade) {
    const competencyArray = []
    const compIndex = CompetencyList.indexOf(competency);
    let min = 0, max = 0;
    if (compIndex < 0) return findCompetencyList(grade);

    if (compIndex >= 2) {
        min = 2;
        max = 2
    }
    else if (compIndex == 1) {
        min = 1;
        max = 3;
    }
    else if (compIndex == 0) {
        min = 0;
        max = 4;
    }

    for (let i = min; i > 0; i--) {
        competencyArray.push(CompetencyList[compIndex - i]);
    }
    competencyArray.push(CompetencyList[compIndex]);

    for (let i = max; i > 0; i--) {
        competencyArray.push(CompetencyList[compIndex + i]);
    }

    return competencyArray;
}

export function randomValueFromArray(valueArray) {
    const value = valueArray.length ? valueArray[Math.floor(Math.random() * valueArray.length)] : null;
    return value;
}

export function randomNumberBetweenTwoNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function randomNumberOfValues(listOfValues, numbersRequired) {
    let tempList = listOfValues;
    const valuesArr = [];
    for (let i = 0; i < numbersRequired; i++) {
        const tempObj = randomValueFromArray(tempList)
        valuesArr.push(tempObj);
        tempList = tempList.filter(item => item.id != tempObj.id);
    }
    return valuesArr;
}

export function updatePairsWithScore(userScore, botsPair, quizLength) {

    botsPair.forEach(pair => {
        pair.forEach(bot => {
            bot.score = bot.id == 100 ? userScore : randomNumberBetweenTwoNum(quizLength - 6, quizLength);
        });
    });
    return botsPair
}

export function getTimerBasedOnGrade(grade) {
    let timerValue = 120;
    Config.GRADE_TIMER && Config.GRADE_TIMER.map(item => {
        if (grade <= item.maxGrade) {
            timerValue = item.timer
        }
    });
    return timerValue;
}

export function nextQuizData(quizList, currentScheduleID, currentQuizId) {

    let nextQuiz = {
        outerQuizId: currentScheduleID,
        innerQuizId: '',
        sequence: 0,
        quizData: {},

    }
    const currentSchedule = quizList.find(schedule => schedule.quizId == currentScheduleID);
    const lengthOfQuizList = currentSchedule.quizList.length;
    const index = currentSchedule?.quizList.map(function (quiz) { return quiz.id; }).indexOf(currentQuizId);
    if (index >= 0 && index < lengthOfQuizList - 1) {
        const newIndex = index + 1;
        nextQuiz.innerQuizId = currentSchedule.quizList[newIndex].id;
        nextQuiz.sequence = currentSchedule.quizList[newIndex].sequence_value;
        nextQuiz.quizData = currentSchedule.quizList[newIndex];
    }
    return nextQuiz;

}

export function getTimeDifferenceInSeconds(startTime, endTime) {

    if (!(startTime || endTime)) return 0;

    const start = moment(startTime);
    const end = moment(endTime);
    const durationbwEndandStart = moment.duration(end.diff(start))

    return parseInt(durationbwEndandStart.asSeconds());
}

export function getCompetencyFromAttendanceAPI(response, userId) {

    return response?.competencylevel?.level && parseInt(response?.competencylevel?.level);
}

export async function getTimeFromApi() {

    let apiDate = moment();
    let headers = {
        "Content-Type": "application/json"
    };
    const instance = axios.create();
    instance.defaults.timeout = 5000;
    await instance.get('https://www.google.com', {
        headers,
    }).then(function (response) {
        apiDate = moment(response.headers?.date);
    })
        .catch(function (err) {
            apiDate = moment()
        });
    return apiDate
}

