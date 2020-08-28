import $_ from '../../settings/styles/DefaultPrimarySettings';


export default {
    // gradeBoxContainer:{
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     flexWrap: 'wrap' mar
    // }
    quizInfoContainer:{
        marginHorizontal: 50,
        marginVertical: 10, 
        borderColor: $_.secondaryColor,
        borderWidth: 1,
        // padding: 10,
        borderRadius: 10,
        // backgroundColor: '#ffffff',
        // flexDirection: 'row',
        // justifyContent: 'space-between'
        
    },
    dateDesc:{
        backgroundColor: $_.secondaryColor,
        borderRadius: 8,
        padding: 10,

    },
    timeDesc:{
        // color: '#255166',
        // fontSize: 22,
        padding: 10,
        borderRadius: 10,
        backgroundColor: $_.white,

    },
    timeText:{
        fontSize: 22,
        flexWrap: 'wrap',
        textAlign: 'center',

    },
    dateText:{
        color: $_.white,
        fontSize: 22,
        flexWrap: 'wrap',
        textAlign: 'center',

    }


}