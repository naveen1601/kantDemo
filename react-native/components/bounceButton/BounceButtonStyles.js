import DefaultPrimarySettings from "../../settings/styles/DefaultPrimarySettings";

export default {
    buttonContainer: {
        backgroundColor: DefaultPrimarySettings.primaryColor,
        position: 'absolute',
        width: '100%',
        borderTopWidth: 1,
        bottom: 0,
        alignSelf:'flex-end'
    },
    textStyle:{
        color: DefaultPrimarySettings.secondaryColor,
        fontSize: DefaultPrimarySettings.baseFontSize+6,
        flexWrap: 'wrap',
        textAlign:'center',
    },
    sponsorContainer:{
        padding:10,
        backgroundColor: DefaultPrimarySettings.primaryColor,
    },
    heightPatch: {
        height: 100,
    },
    textHeightPatch:{
        height: 65,
    }
}