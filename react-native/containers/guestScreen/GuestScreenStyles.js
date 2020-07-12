import $_ from './GuestScreenSettings';

export default {
    guestScreen: {
       paddingLeft: 10,
       paddingRight: 10,
       paddingTop: 20
    },
    validationErrorText: {
        marginHorizontal: $_.validationErrorMarginHorizontal,
        marginTop: $_.validationErrorMarginTop,
        color: $_.errorMessageColor,
        fontSize: $_.validationErrorFontSize,
        marginBottom: $_.validationErrorMarginBottom,
    },
    gradeLabelText:{
        fontSize: $_.labelTextFontSize
    },
    gradeLabelBox:{
        marginTop: $_.gradeBoxMarginTop,
        marginBottom: $_.gradeBoxMarginBottom,
    },
    nameLabelBox:{
        marginTop: $_.nameBoxMarginTop,
        marginBottom: $_.nameBoxMarginBottom,
    },
    nameLabelText:{
        fontSize: $_.labelTextFontSize,
        paddingBottom: $_.nameTextPaddingBottom,
        paddingLeft: $_.nameTextPaddingLeft
    },
}