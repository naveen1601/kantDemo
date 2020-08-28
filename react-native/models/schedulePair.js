

export function getPair(studentPairObj) {
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
