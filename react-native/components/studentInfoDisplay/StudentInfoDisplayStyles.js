import $_ from './StudentInfoDisplaySettings';

export default {
    studentInfoContainer: {
        padding: $_.conatinerPadding,
        flexDirection: 'row'
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
        fontSize: $_.nameFontSize
    },
    userInfoDivision: {
        paddingLeft: $_.userInfoPaddingLeft
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
    }
}