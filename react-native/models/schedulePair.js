

export function getleaderBoardPairingMatrix(res, userId) {
    const sortedLeaderboardBySequence = res.leaderboard_data.sort((a, b) => parseFloat(a.sequence_value) - parseFloat(b.sequence_value));
    //const counterSequenceArray = sortedLeaderboardBySequence.map(item => item.counterPlayer?.id).filter(item => item != undefined);

    let userOponentId = '';
    const counterSequenceArray = [];

    const pairingMatrix = [];
    sortedLeaderboardBySequence.map(studentApiPairObj => {

        //gettingOponent Id of the user
        if (studentApiPairObj.student.id == userId) {
            userOponentId = studentApiPairObj.counterPlayer?.id;
        }

        if (counterSequenceArray.indexOf(studentApiPairObj.student.id) < 0) {
            pairingMatrix.push(getPair(studentApiPairObj));
            studentApiPairObj.counterPlayer &&
                counterSequenceArray.push(studentApiPairObj.counterPlayer?.id);
        }
    });

    return { pairingMatrix, userOponentId };
}
function getPair(studentPairObj) {
    const pairValue = [];
    const studentObj = getStudentDetail(studentPairObj.student);
    studentObj.sequence = studentPairObj.sequence_value;
    studentObj.position = studentPairObj.positionChanged;

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
            studentId: student.id
        }
}


export function getFinalleaderBoardMatrix(res, userId){
    const sortedLeaderboardBySequence = res.leaderboard_data.sort((a, b) => parseFloat(a.sequence_value) - parseFloat(b.sequence_value));
    let userOponentId = '';
    const studentArray = [];
    const pairingMatrix = [];

    for(let i =0; i<sortedLeaderboardBySequence.length; i++){
  
        let pairObj = [];
        if( studentArray.indexOf(sortedLeaderboardBySequence[i].student) < 0 ) {
          
            studentArray.push(sortedLeaderboardBySequence[i].student);
            pairObj.push(changeObjFormat(sortedLeaderboardBySequence[i]));
            //gettingOponent Id of the user
            if (sortedLeaderboardBySequence[i].student == userId) {
                userOponentId = sortedLeaderboardBySequence[i].counterPlayer;
            }
            
            if(sortedLeaderboardBySequence[i].counterPlayer){
              studentArray.push(sortedLeaderboardBySequence[i].counterPlayer);
              const counterstudent = sortedLeaderboardBySequence.find( function(user){
                return user.student == sortedLeaderboardBySequence[i].counterPlayer;
              });
              if(counterstudent){
                pairObj.push(changeObjFormat(counterstudent));
              }
              
            } // second if
          pairingMatrix.push(pairObj)
        } // 1 if
      }//for loop

      return { pairingMatrix, userOponentId: 'test' };
}

function changeObjFormat(studentData){
    return {
        name : studentData.student_name,
        rollNumber: studentData.rollNumber,
        studentId: studentData.student,
        sequence: studentData.current_sequence_value,
        position: studentData.positionChanged
    }
}
