

export function getleaderBoardPairingMatrix(res) {
    const sortedLeaderboardBySequence = res.leaderboard_data.sort((a, b) => parseFloat(a.sequence_value) - parseFloat(b.sequence_value));
    //const counterSequenceArray = sortedLeaderboardBySequence.map(item => item.counterPlayer?.id).filter(item => item != undefined);
    const counterSequenceArray = []

    const pairingStudentsArray = [];
    sortedLeaderboardBySequence.map(studentApiPairObj => {
        // const studentId = studentApiPairObj.student.id;
        if (counterSequenceArray.indexOf(studentApiPairObj.student.id) < 0) {
            pairingStudentsArray.push(getPair(studentApiPairObj));
            studentApiPairObj.counterPlayer &&
                counterSequenceArray.push(studentApiPairObj.counterPlayer?.id);
        }
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
