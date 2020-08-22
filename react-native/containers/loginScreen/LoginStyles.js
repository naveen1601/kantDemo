import $_ from './LoginSettings';
import { Dimensions, Platform } from 'react-native';
const d = Dimensions.get('window');
const isX = Platform.OS === 'ios' && (d.height > 800 || d.width > 800) ? true : false;
import $primary from '../../settings/styles/DefaultPrimarySettings';

export default {

    textInputFieldsContainer: {
        flexDirection: 'row',
        paddingVertical  :  $primary.baseGridUnit,
        borderColor: $primary.grayColors._200,
        marginBottom: $_.loginInputFieldsContainerMarginBottomAndroid,
    },
    nameLabelText:{
        fontSize: $_.labelTextFontSize,
        paddingTop: $_.nameTextPaddingBottom,
        width:'30%',
         
    },
    iconStyle: {
        color: $primary.grayColors._200,
        paddingTop: 12,
    },
    forgetPassBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
 
    },
    loginContainer: {        
        padding:10 
    },
    loginBox:{   
        marginVertical:50,
    },
    loginButton:{
        marginVertical:50,
    },
    buttonStyle:{
        margin:0
    },
    inputStyle:{
        width:'70%',
    },

//jjjjjjjjjjjj
    // guestScreen: {
    //     paddingLeft: 10,
    //     paddingRight: 10, width:'70%'
    //     paddingTop: 20
    // },
    // validationErrorText: {
    //     marginHorizontal: $_.validationErrorMarginHorizontal,
    //     marginTop: $_.validationErrorMarginTop,
    //     color: $_.errorMessageColor,
    //     fontSize: $_.validationErrorFontSize,
    //     marginBottom: $_.validationErrorMarginBottom,
    // },
    // gradeLabelText:{
    //     fontSize: $_.labelTextFontSize
    // },
    // gradeLabelBox:{
    //     marginTop: $_.gradeBoxMarginTop,
    //     marginBottom: $_.gradeBoxMarginBottom,
    // },
    // nameContainer:{
    //     marginTop: $_.nameBoxMarginTop,
    //     marginBottom: $_.nameBoxMarginBottom,
    // },
    // nameInputBox:{
    //     marginLeft: 3,
    //     marginRight: 5,
    // }

}

