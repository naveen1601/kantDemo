import $_ from './SelectBoxSettings';

let SelectBoxStyles = {
    buttonBox: {
        borderColor: $_.borderColor,
        borderWidth: 1,
        borderRadius: 5,
        width: $_.boxSize, 
        height: $_.boxSize
    },
    textBox:{
        color: $_.textColor,
        textAlign: 'center',
        paddingTop: $_.textPadding,
        fontSize: $_.textSize,
        fontWeight: $_.textFontWeight,
        flexGrow: 3
    },

    buttonBoxSelected: {
        backgroundColor: $_.selectedBackgroundColor
    },
    textBoxSelected:{
        color: $_.selectedTextColor,
    }
};

export default SelectBoxStyles;
