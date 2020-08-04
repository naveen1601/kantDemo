
export const CompetencyAndGradeArray = {
    1: [70, 90, 110, 130, 150],
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
    return CompetencyArray[grade];
}

export function randomValueFromArray(valueArray) {
    const value= valueArray.length ? valueArray[Math.floor(Math.random() * valueArray.length)] : null;
    return value;
}

export function randomNumberBetweenTwoNum(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}

export function randomNumberOfValues(listOfValues, numbersRequired) {
    let tempList = listOfValues;
    const valuesArr = [];
    for(let i=0; i<numbersRequired; i++){
        const tempObj = randomValueFromArray(tempList)
        valuesArr.push(tempObj);
        tempList =tempList.filter(item =>item.id != tempObj.id);
    }
    return valuesArr;
}


