import $_ from './StudentInfoDisplaySettings';

export default {
    studentInfoContainer: {
        padding: $_.conatinerPadding,
        flexDirection: 'row',
        width: '70%'
    },
    userInitialWrapper: {
        padding: $_.userInitialWrapperPadding,
        width: $_.userInitialSize,
        height: $_.userInitialSize,
        borderRadius: $_.userInitialSize,
        backgroundColor: $_.userInitialBGColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userInitial: {
        fontSize: $_.userInitialFontSize,
        color: $_.userInitialColor
    },
    displayName: {
        paddingTop: $_.namePaddingTop,
        fontSize: $_.nameFontSize,
    },
    userInfoDivision: {
        paddingLeft: $_.userInfoPaddingLeft,
        fontSize: $_.userInfoFontSize
        
    },
    displayGradeLabel: {
        paddingTop: 6,
        fontSize: $_.userInfoFontSize
    },
    displayGradeValue: {
        color: $_.userInitialColor
    },
    diplaySchool: {
        fontSize: $_.userInfoFontSize
    },

    studentInfoContainer_small:{
        width: '50%',
        paddingLeft: 10,
        paddingRight: 0,
        borderBottomColor: '#255166',
        borderBottomWidth: 2,
        backgroundColor: '#e9f4f7'
    },
    userInitialWrapper_small: {
        width: 60,
        height: 60
    },
    userInitial_small: {
        fontSize: 36
    },
    displayName_small: {
        paddingTop: 4,
        fontSize: 16   
    },
    userInfoDivision_small: {
        paddingLeft: 8,
        width:'70%'
    }

}