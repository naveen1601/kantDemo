

export function getleaderBoardPairingMatrix(res){
    const sortedLeaderboardBySequence = res.leaderboard_data.sort((a, b) => parseFloat(a.sequence_value) - parseFloat(b.sequence_value));
    const counterSequenceArray = sortedLeaderboardBySequence.map(item => item.counterPlayer?.id).reduce(item => item != undefined);

    const pairingStudentsArray = [];
    sortedLeaderboardBySequence.map(studentApiPairObj=>{
        counterSequenceArray.indexOf( studentApiPairObj.student.id) && pairingStudentsArray.push(getPair( studentApiPairObj ))
    });

    return pairingStudentsArray;
}



function getPair(studentPairObj) {
    const pairValue = [];
    const studentObj = getStudentDetail(studentPairObj.student);
    studentObj.sequence = studentPairObj.sequence_value;
    
    pairValue.push(studentObj);

    if (studentPairObj.counterPlayer) {
        const counterStud = getStudentDetail(studentPairObj.counterPlayer);
        counterStud.sequence = studentPairObj.counter_sequence_value;
        pairValue.push(counterStud);
    }

    // [{
    //     name,
    //     rollNumber,
    //     studentId,
    //     sequence
    // }, repeat]
    return pairValue;

}

function getStudentDetail(student) {

    if (student)
        return {
            name: student.name,
            rollNumber: student.rollNumber,
            studentId: student.id,
        }
}
