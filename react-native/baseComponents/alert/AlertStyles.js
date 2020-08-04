//import $_ from './ToolTipSettings'
import $primary from '../../settings/styles/DefaultPrimarySettings';

export let PropStyles = {
    errorColor: $primary.informationColors.error,
    warningColor: $primary.informationColors.warning,
    errorIconSize: $primary.baseGridUnit * 2,
    disabledColor: $primary.disabledColor,
    chevronColor: $primary.grayColors._300,
    chevronIconSize: $primary.baseGridUnit,
};
export default {
    alertWrapper: {
        flexDirection: 'row',
        margin: $primary.baseGridUnit + 2,
        android: {
            margin: $primary.baseGridUnit - 4,
            marginHorizontal: $primary.baseGridUnit * 2
        }
    },
    alertInfoWrapper: {
        backgroundColor: $primary.informationColors.infoLight,
        borderLeftColor: $primary.informationColors.info,
        borderLeftWidth: $primary.baseGridUnit,
        padding: $primary.baseGridUnit,
        marginHorizontal: 0,
        borderWidth: 1,
        borderColor:$primary.informationColors.info
    },
    alertSuccessWrapper: {
        backgroundColor: $primary.informationColors.successLight,
        borderLeftColor: $primary.informationColors.success,
        borderLeftWidth: $primary.baseGridUnit,
        padding: $primary.baseGridUnit,
        marginHorizontal: 0,
    },
    alertWarningAction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: $primary.informationColors.warningLight,
        borderLeftWidth: $primary.baseGridUnit,
        borderLeftColor: $primary.informationColors.warning,
        padding: $primary.baseGridUnit,
    },
    alertWarningActionWrapper: {
        borderWidth: 1,
        borderColor:  $primary.grayColors._200,
        borderRadius: $primary.baseGridUnit / 2,
        overflow: 'hidden',
        marginHorizontal: 0,
    },
    infoMessage: {
        flex: 1,
        color: $primary.grayColors._500,
        fontStyle: 'normal',
        fontSize: $primary.baseFontSize + 1,
    },
    errorIcon: {
        ios: {
            lineHeight:($primary.baseGridUnit * 2) + 1
        }
    },
    chevronIcon: {
        width: PropStyles.chevronIconSize
    },
    message: {
        flex: 1,
        textAlign: 'left',
        fontStyle: 'italic',
        marginLeft: $primary.baseGridUnit
    },
    errorMessage:{
        color: PropStyles.errorColor,
    },
    warningMessage:{
        color: PropStyles.warningColor,
    }
};