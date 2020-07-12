import $primary from '../../settings/styles/DefaultPrimarySettings';

let $_ = {

    borderColor:  $primary.secondaryColor,
    textColor: $primary.secondaryColor,
    selectedBackgroundColor: $primary.secondaryColor,
    selectedTextColor: $primary.white,
    boxSize: $primary.baseGridUnit * 8,
    boxMarginBottom: $primary.baseGridUnit * 2,
    boxMarginRight: $primary.baseGridUnit * 2,
    textPadding: $primary.baseGridUnit * 2,
    textSize: $primary.baseFontSize + 6,
    textFontWeight: $primary.fontWeight.bold
};

export default $_;
